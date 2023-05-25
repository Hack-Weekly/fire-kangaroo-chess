import React from 'react';
import { Link } from 'react-router-dom';
import './Grid.css';



const QuickStartSection = () => {
    return (
    <div id='quickStartSection'>
        <h4>Quick Start</h4>
        <div className='quickStartBtn'>
            <div className="lobby__app__content lpools">
                <button>
                    <Link to='/play/ethan' className='aiLink'>
                        <div data-id="1+0">
                            <div className="clock">AI</div>
                            <div className="perf">Ethan</div>
                        </div>
                    </Link>
                </button>

                <button>
                    <Link to='/play/ava' className='aiLink'>
                        <div data-id="2+1">
                            <div className="clock">AI</div>
                            <div className="perf">Ava</div>
                        </div>
                    </Link>
                </button>

                <button>
                    <Link to='/play/john' className='aiLink'>
                        <div data-id="3+0">
                            <div className="clock">AI</div>
                            <div className="perf">John</div>
                        </div>
                    </Link>
                </button>

                <button>
                    <Link to='/play/issac' className='aiLink'>
                        <div data-id="3+2">
                            <div className="clock">AI</div>
                            <div className="perf">Sir Isaac</div>
                        </div>
                    </Link>
                </button>

                <button>
                    <Link to='/play/elijah' className='aiLink'>
                        <div data-id="5+0">
                            <div className="clock">AI</div>
                            <div className="perf">Elijah</div>
                        </div>
                    </Link>
                </button>

                <button>
                    <Link to='/play/benjamin' className='aiLink'>
                        <div data-id="5+3">
                            <div className="clock">AI</div>
                            <div className="perf">Benjamin</div>
                        </div>
                    </Link>
                </button>
            </div>
        </div>
    </div>
    
    )
}
                export default QuickStartSection;

                