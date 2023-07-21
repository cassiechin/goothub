import { Title } from 'solid-start';
import "./index.css";

export default function Home() {
	return (
		<div class="body-container">
			<Title>Home</Title>
			<h1 class="home-title">Welcome to Goothub!</h1>
			<div class="flex justify-center mb-8">
				<img src="/kitty-cat.gif" />
			</div>
			<div class="home-widget">
				<h2>Chess Daily Puzzle</h2>
				<iframe style="width: 400px; height: 502px;" src="https://www.chess.com/daily_puzzle"></iframe>
				<p>
					From <a href="https://www.chess.com/daily-chess-puzzle">https://www.chess.com/daily-chess-puzzle</a>
				</p>
			</div>
			<div class="home-widget">
				<h2>Sudoku</h2>
				<div class="sudoku flex justify-between">
					<iframe src="https://mczak.com/code/sudoku/suframe/" style="border:0px solid #eee; overflow:hidden; width:400px; height:500px;" width="400"></iframe>
				</div>
			</div>			
			<div class="home-widget">
				<h2>Solitaire</h2>
				<div id="solitaire_embed" style="width:100%;">
					<div style="position:relative;padding-bottom:75%;border-radius:6px;overflow:hidden;">
						<iframe style="width:100%;height:100%;position:absolute;left:0px;top:0px;border:0px;" width="100%" height="100%" src="https://online-solitaire.com/klondike-solitaire/4h8rhc8osdl" title="Play Klondike (Turn 1) and many more Solitaire games at online-solitaire.com"></iframe>
						<div style="position:absolute;width:100%;height:100%;top:0px;left:0px;pointer-events:none;box-shadow:inset 0px 0px 0px 1px rgba(0,0,0,0.25);border-radius:6px;"></div>
					</div>
					<p>
						From <a href="https://online-solitaire.com/embed" target="_blank">https://online-solitaire.com/embed</a>
					</p>
				</div>
			</div>
		</div>
	);
}
