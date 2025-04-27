Zero dependency nodejs implementation of the UCI protocol from the GUI perspective.


## Usage
The main engine class is a named export under @chess-broadcaster-suite/uci.
Engine path and data callback to handle incoming messages are obligatory;
error callback to handle raw error pipe is an optional callback.

### Simple Example
```
import { Engine } from @chess-broadcaster-suite/uci

const engine = new Engine({
		dataCallback: (data) => {
			console.log(data) // do something smart with the array of messages!
		},
		path: 'your/path/to/stockfish/binary'
	})
await engine.initialize()
engine.go({ infinite: true })
```

You will receive array of messages like
```
data [
  {
    raw: 'info depth 17 seldepth 23 multipv 1 score cp 37 nodes 100673 nps 535494 hashfull 34 tbhits 0 time 188 pv e2e4 e7e5 g1f3 g8f6 b1c3 d7d6 d2d4 e5d4 f3d4 f8e7 f1b5 c7c6 b5d3 e8g8 e1g1 c6c5 d4f3 b8c6',
    type: 'info',
    depth: 17,
    seldepth: 23,
    multipv: 1,
    score: { cp: 37 },
    nodes: 100673,
    nps: 535494,
    hashfull: 34,
    tbhits: 0,
    time: 188,
    pv: [
      'e2e4', 'e7e5', 'g1f3',
      'g8f6', 'b1c3', 'd7d6',
      'd2d4', 'e5d4', 'f3d4',
      'f8e7', 'f1b5', 'c7c6',
      'b5d3', 'e8g8', 'e1g1',
      'c6c5', 'd4f3', 'b8c6'
    ]
  }
]
```
in your dataCallback handler.

## Documentation
See https://chess-broadcaster-suite.github.io/cbs/modules/_chess-broadcaster-suite_uci.html


### Changing positions and lifecycle
Typically, you can do sth like
```
engine.go({ infinite: true })
const bestmove1 = await engine.stop()
engine.position({ startpos: true, moves: ['e2e4'] })
engine.go({ infinite: true })
const bestmove2 = await engine.stop()
// etc
```

For every `go` command issued, you have to either make an explicit `stop` call, or wait for analysis to finish. Trying to send another `go` while the previous analysis has not stopped yet will be ignored (as a matter of fact, no efforts will be made to write the command as some engines seem to not take multiple `go`s well) .

So, an infinite go search (either by setting an explicit `.infinite: true` parameter or an implicit inifinite search when not passing at least one of `depth, nodes or movetime` params) always has to be stopped. A finite go search (one that does not set `infinite` and sets at least one of `depth, nodes or movetime` params) will also be automatically stopped when the `bestmove` message is received.

Mind that an infinite search with depth/nodes/movetime is still an infinite search, thus a one that has to be stopped explicitly.

### Finite analysis
If you need to process finite analysis (limiting analysis by depth/movestime/nodes) in a sync manner, engine exposes the `completeAnalysis` method you can use to block.

```
engine.go({ depth: 20 })
await engine.completeAnalysis()
engine.position({ startpos: true, moves: ['e2e4'] })
engine.go({ depth: 20 })
await engine.completeAnalysis()
// ...
```

`completeAnalysis` has an optional `timeout` parameter that can be used to make sure you don't get stuck waiting forever.


### Engine parameters
Path & dataCallback are the only mandatory params.
You will receive an array of parsed messages on the dataCallback; there are following UCIMessageType(s)
- BEST_MOVE
- COPY_PROTECTION
- ID
- INFO
- OPTION
- READYOK
- REGISTRATION
- UCIOK

Engine provides an optional `errorCallback` to pipe stderror from the engine process running behind the scenes.
There are a couple of methods that will potentially throw in critical situations:
- initialize (unable to exec process or `uci` fails)
- uci (write fails/engine does not respond with `uciok` in time)
- isready (write fails/engine does not respond with `readyok` in time)
- and any command implying a write that might fail (setoption, go, ucinewgame, ...)
All such functions are explicitly marked with @throws and can be try-caught.

But, compliant with the UCI spec, any inconsistencies/unparseable UCI messages from the engine will be ignored. To make things less opaque, you can attach `invalidMessageCallback` and handle them separately.
Note even some mainstream engines like lc0 write non-UCI lines, so an invalidMessageCallback payload should not be treated as an error.
