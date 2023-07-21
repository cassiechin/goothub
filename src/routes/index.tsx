import { Title } from 'solid-start';
import "./index.css";

export default function Home() {
	return (
		<div class="body-container">
			<Title>Home</Title>
			<h1 class="home-title">Welcome!</h1>
            <div class="home-img">
                <img src="/github.png"></img>
            </div>
		</div>
	);
}
