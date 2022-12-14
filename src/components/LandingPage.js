/* Start of import */
import { Outlet } from "react-router-dom";
import React, { Component } from 'react';
import styled from 'styled-components';
import { GitHub, LinkedIn, Twitter, HackerRank } from './SocialMedia/Logos';
import content from '../config/content';
import Projects from './Projects';
/* End of import */

/* Start of Styled Components, aka CSS-in-JS */
const LoadingMessage = styled.div.attrs({
	className: `flex justify-center items-center pa6`
})``

const Container = styled.div.attrs({
	className: `vh-100-l h-auto overflow-hidden-l`
})``

// const TopBar = styled.div.attrs({
// 	className: `w-100 ph3 pv2`
// })``

// const TopBarWrapper = styled.div.attrs({
// 	className: `flex flex-wrap justify-between items-center`
// })``

// const User = styled.div.attrs({
// 	className: `flex flex-wrap justify-center items-center`
// })``

const UserInfo = styled.div.attrs({
	className: `pa2`
})``

const Language = styled.span.attrs({
	className: `f6 pr2 pv1`
})``

const Languages = styled.div.attrs({
	className: `pt1 font-ubuntu-mono flex flex-wrap flex-row`
})``

const Emoji = styled.img.attrs({
	className: `w1`
})``

const ImageContainer = styled.div.attrs({
	className: ``
})``

const SocialMedia = styled.div.attrs({
	className: ``
})``
/* End of Styled Components */

const Hire = () => {
	return (
		<div className="absolute-l left-0-l bottom-0-l w-100 f5 tc pa3">
			<a href={`mailto:${content.email}`} className="pa1 color-inherit no-underline dim" alt="">
				{content.hire_msg}
			</a>
		</div>
	)
}

/* React Class Component (like any other class in other OOP language with the addition of lifecycles), provides you with the ability to leverage State and Lifecycle.

https://reactjs.org/docs/react-component.html
*/
class LandingPage extends Component {
	// constructor method, props is the arguments passed to the component.
	constructor(props) {
		super(props);
		this.languages = {};

		// leveraging state.
		this.state = {
			langColors: [],
			user: null,
			topLang: []
		}
	}

	// normal method, called using this.updateLanguages().
	updateLanguages = (languages) => {
		const ignoredLanguages = content.languages_to_ignore_for_top;

		for (let lang in languages) {
			const size = languages[lang];
			if (!ignoredLanguages[lang]) {
				this.languages[lang] ?
				this.languages[lang] += size :
				this.languages[lang] = size;
			}
		}
	}

	// normal method, called using this.updateTop3Languages().
	updateTop3Languages = () => {
		// Convert data hashmap, this.languages
		// to array form for easy sorting.
		let topLang = [];
		for (let lang in this.languages) {
			topLang.push([lang, this.languages[lang]])
		}

		topLang.sort((a, b) => b[1] - a[1]);
		this.setState({ topLang: topLang });
	}

	// leveraging a lifecycle method.
	// componentDidMount is invoked immediately after a component is mounted (inserted into the DOM tree). 
	componentDidMount() {
		/* Start of a part of Task 2 */

		/* Code goes below here */
		// Fetches user's profile.
		fetch(`https://api.github.com/users/${content.github_username}`)
		.then(response => response.json())
		.then(result => {
			this.setState({ user: result });
			document.title = `${result.name}'s Portfolio`;
		});
		/* End of a part of Task 2 */


		/* Start of Task 3 */

		/* Code goes below here */
		// F /* We specify an endpoint to fetch data from. */
 fetch('https://raw.githubusercontent.com/Diastro/github-colors/master/github-colors.json')
 /*
 Once fetched, we then parse the response.

 Response will be in the form of a string,
 we convert the data to json via .json() method.
 */
 .then(function(response) {
 	return response.json();

 })
 /*
 We can then do whatever we like with the json object.

 The example below converts the json back to a string and outputs to the console.
 */
 .then(function(myJson) {
 	console.log(JSON.stringify);
 });

		/* End of Task 3 */
	}

	/*
	Whatever the render method returns will be shown in the webpage.
	
	This is where you write JSX, a syntax to use both HTML and JavaScript together.
	
	i.e.
		1. In JSX, we use className instead of HTML's class, because HTML's class conflicts with JavaScript's class.

		2. By default, JSX will assume you are writing code for HTML, so to use a JavaScript variable, you have to wrap it in curly brackets, likeso
				<span>{user.name}</span>
	*/
	render() {
		const { langColors, user, topLang } = this.state;
		const { github_username, number_of_languages_to_show, emojis } = content;
		return (
			/*
			JavaScript's ternary operator's syntax
			(condition) ? (if true do this) : (else this)

			user is null when github data is not done fetching.

			If not done fetching,
			Show "Loading" when not done fetching,
			else show all repository info in cards.
			*/
			user == null
			?
			<LoadingMessage>
				Loading...
			</LoadingMessage>
			:
			<Container>
				{/* User Profile with name, location, top languages, social media */}

				{/* Start of Task 4 - Reconstruct me please */}

				{/* Code goes below me */}
				<ImageContainer>
	              <img src={user.avatar_url} className="br-100 pa1 ba b--black-10 h3 w3" alt="avatar" />
                </ImageContainer>

				<UserInfo>
	               <span>{user.name}</span>
	               <span className="f6 font-ubuntu-mono">&nbsp;@&nbsp;</span>
	               <span className="f6 font-ubuntu-mono">{user.location}</span>
	               {/* Something was here, determine based on the above image. */}
                </UserInfo>

				<Languages>
	              {topLang.slice(0, number_of_languages_to_show).map((lang, ind) => (
		          <Language key={ind} style={{color: `${langColors[lang[0]]}`}}>
			      <Emoji src={emojis[ind]} />
			       {lang[0]}
		          </Language>
	))}
                 </Languages>

				 <SocialMedia>
	                <GitHub urlToUse={`https://github.com/${github_username}`} />
	                {user.blog.includes("linkedin.com") && <LinkedIn urlToUse={user.blog} />}
	                {user.blog.includes("twitter.com") && <Twitter urlToUse={user.blog} />}
	                {user.blog.includes("hackerrank.com") && <HackerRank urlToUse={user.blog} />}
                 </SocialMedia>
				{/* End of Task 4 */}

				<Projects updateLanguages={this.updateLanguages} updateTop3Languages={this.updateTop3Languages} langColors={langColors} />
				<Outlet/>
				{user.hireable && <Hire />}
			</Container>
		)
	}
}

export default LandingPage;