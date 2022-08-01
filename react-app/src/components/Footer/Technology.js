import './footer.css'

const Technology = () => {
    return (
        <div className='about-outer-container'>
            <div className='headingOne'>OUR SKILL SET</div>
            <div className='headingTwo'>Technologies used for this project</div>


            <div className='tech-container'>
                <div className='tech'>
                    <i className="fa-brands fa-python fa-2xl"></i>
                    <a className="developer-link" target="_blank" rel="noopener noreferrer" href='https://www.python.org/doc/' >Python</a>
                </div>
                <div className='tech'>
                    <i className="fa-brands fa-js fa-2xl"></i>
                    <a className="developer-link" target="_blank" rel="noopener noreferrer" href='https://developer.mozilla.org/en-US/docs/Web/JavaScript' >JavaScript</a>
                </div>
                <div className='tech'>
                    <i className="fa-brands fa-css3-alt fa-2xl"></i>
                    <a className="developer-link" target="_blank" rel="noopener noreferrer" href='https://developer.mozilla.org/en-US/docs/Web/css' >CSS Documentation</a>
                </div>
                <div className='tech'>
                    <i className="fa-brands fa-html5 fa-2xl"></i>
                    <a className="developer-link" target="_blank" rel="noopener noreferrer" href='https://developer.mozilla.org/en-US/docs/Web/HTML' >HTML Documentation</a>
                </div>
                <div className='tech'>
                    <i className="fa-brands fa-reacteurope fa-2xl"></i>
                    <a className="developer-link" target="_blank" rel="noopener noreferrer" href='https://redux.js.org/' >Redux Documentation</a>
                </div>
                <div className='tech'>
                    <i className="fa-brands fa-react fa-2xl"></i>
                    <a className="developer-link" target="_blank" rel="noopener noreferrer" href='https://reactjs.org/docs/getting-started.html' >React Documentation</a>
                </div>
                <div className='tech'>
                    <i className="fa-brands fa-font-awesome fa-2xl"></i>
                    <a className="developer-link" target="_blank" rel="noopener noreferrer" href='https://fontawesome.com/' >Font Awesome</a>
                </div>
                <div className='tech'>
                    <i className="fa-solid fa-database fa-2xl"></i>
                    <a className="developer-link" target="_blank" rel="noopener noreferrer" href='https://www.postgresql.org/' >PostgreSQL</a>
                </div>
                <div className='tech'>
                    <i className="fa-solid fa-flask fa-2xl"></i>
                    <a className="developer-link" target="_blank" rel="noopener noreferrer" href='https://flask.palletsprojects.com/en/2.1.x/' >Flask</a>
                </div>

            </div>



        </div>
    )
}

export default Technology
