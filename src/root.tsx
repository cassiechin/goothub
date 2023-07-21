// @refresh reload
import { Suspense } from 'solid-js';
import {
	A,
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title
} from 'solid-start';
import 'material-icons/iconfont/material-icons.css';
import './root.css';
import { SessionProvider } from "@solid-auth/base/client";
import {TopNav} from './components/TopNav';


export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>SolidStart - Bare</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Body>
				<SessionProvider>
				<Suspense>
					<ErrorBoundary>
						<TopNav/>
						<Routes>
							<FileRoutes />
						</Routes>
					</ErrorBoundary>
				</Suspense>
				</SessionProvider>
				<Scripts />

			</Body>
		</Html>
	);
}
