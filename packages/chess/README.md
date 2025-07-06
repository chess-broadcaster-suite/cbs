Nodejs implementation of chess rules and structures.
Probably buggy and in alpha now!

## Usage
The package provides an implementation of Fischer/chess960 as the default variant,
as Fischer random is a subset of "standard" chess.
You can import the libraries from `@chess-broadcaster-suite/chess/fischer`.

The variant implements a bunch of interfaces available under `@chess-broadcaster-suite/chess/generics`.
Generally, a game on 64 squares where white and black alternate turns and make some sort of moves on the board
should be describable by the provided interfaces.
