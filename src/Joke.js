import { useMemo, useEffect, useState } from "react"

export default function Joke()
{
    let jokeStatus = 1
    const randomJokeIndex = () => (Math.ceil(Math.random() * 28))
    let index = randomJokeIndex()
    
    const display = document.getElementById("display")
    const button = document.getElementById("button")
    const tellJoke = () => {
        if( jokeStatus === 0)
        {
            jokeStatus = 1
            display.innerHTML = "Knock Knock"
            display.classList.remove("displayOn")
            button.innerHTML = "Who's there?"
            index = randomJokeIndex()
        }
        else if (jokeStatus === 1) {
            jokeStatus = 2
            display.innerHTML = jokes[index].setup
            display.classList.add("displayOn")
            button.innerHTML = jokes[index].setup + " Who?"
        }   
        else{
            jokeStatus = 0
            display.innerHTML = jokes[index].finish
            display.classList.add("displayOn")
            button.innerHTML = "Tell Me Another!"
        }
    }

    const [ jokes, setJokes ] = useState([])

    const getJokes = async () => {
        const response = await fetch('https://raw.githubusercontent.com/nargaw/Vanilla-JS-Projects/main/Knock%20Knock/jokes.json')
        const result = await response.json()
        setJokes(result)
    }

    useEffect(() => {
        getJokes()
    }, [])

    return <>
        <div className="wrapper">
            <div id="display" className="display">Knock Knock</div>
            <div id="button" className="button" onClick={ tellJoke}>Who's there?</div>
        </div>
    </>
       
}