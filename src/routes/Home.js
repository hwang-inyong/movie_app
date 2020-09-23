import axios from "axios";
import React from "react";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {

	state = {
		isLoading: true,
		movies: []
	};

	// 컴포넌트 렌더링 된 후
	componentDidMount() {
		// console.log("Component rendered");
		this.getMovies();
	}

	// 컴포넌트 업데이트 된 후
	componentDidUpdate() {
		// console.log("I just updated");
	}

	// 컴포넌트가 떠날때만 호출 어떤 걸 하거나 다른 페이지로 갈때
	componentWillUnmount() {
		// console.log("Goodbye, cruel world");
	}

	getMovies = async () => {
		const {
			data: {
				data: { movies } }
		} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
		this.setState({ movies, isLoading: false })
	}

	render() {
		// console.log("I'm rendering");
		const { isLoading, movies } = this.state;
		return (
			<section className="container">
				{
					isLoading ? (
						<div className="loader">
							<span className="loader__text">Loading...</span>
						</div>
					)
						:
						(
							<div className="movies">
								{movies.map(movie => (
									<Movie
										key={movie.id}
										id={movie.id}
										year={movie.year}
										title={movie.title}
										summary={movie.summary}
										poster={movie.medium_cover_image}
										genres={movie.genres}
									/>
								))}
							</div>
						)
				}
			</section>
		);
	}
}

export default Home;