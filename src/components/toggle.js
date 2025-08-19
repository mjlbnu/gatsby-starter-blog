import React from "react"
import "./toggle.css"
import Sun from "../images/sun.svg"
import Moon from "../images/moon.svg"

export default function DarkMode() {
  const [isDark, setIsDark] = React.useState(getDefaultTheme())
  const [animating, setAnimating] = React.useState(false)
  const [prevTheme, setPrevTheme] = React.useState(isDark)

  function getDefaultTheme() {
    const savedTheme = window.localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'dark';
  }

  React.useEffect(() => {
    if (isDark === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    window.localStorage.setItem('theme', isDark);
  }, [isDark])

  const handleToggle = () => {
    setPrevTheme(isDark);
    setAnimating(true);
    setTimeout(() => {
      setIsDark(isDark === "dark" ? "light" : "dark");
      setAnimating(false);
    }, 500);
  };

  return (
    <div className="top-menu-fixed">
      <span style={{position: "relative", display: "inline-block", width: 32, height: 32}}>
        {/* Imagem atual */}
        <img
          src={isDark === "dark" ? Sun : Moon}
          alt={isDark === "dark" ? "sun img" : "moon img"}
          className={`toggle-img ${animating ? "exit" : "enter"}`}
          style={{zIndex: 2}}
        />
        {/* Imagem que entra */}
        {animating && (
          <img
            src={prevTheme === "dark" ? Moon : Sun}
            alt={prevTheme === "dark" ? "moon img" : "sun img"}
            className="toggle-img from-top enter"
            style={{zIndex: 1}}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 32,
            height: 32,
            zIndex: 3,
            cursor: "pointer"
          }}
          onClick={handleToggle}
        />
      </span>
    </div>
  )
}