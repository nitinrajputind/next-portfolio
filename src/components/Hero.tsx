import React from 'react'
import Button from './Button'

export default function Hero() {
  return (
    <div className='hero'>
        <h1 className="hero_title">
            Hello My name is 
        </h1>
        <h2 className="hero_title_large">
            Nitin Rajput
        </h2>
        <h3 className="hero_title_large hero_title_sub">
            I craft think for Web.
        </h3>
        <p className="hero_text">
        Hi, I&apos;m a full-stack software engineer specializing in the MERN stack. I build dynamic web applications with a focus on accessibility and great user experiences.
        </p>
        <div className="hero_Button">
            <Button text='Download Resume' link={''}></Button>
        </div>
    </div>
  )
}
