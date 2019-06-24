import React, {Component} from 'react';

class ViewModulePage extends Component {
    render() {
        return (
            <div className="form_divStyle">
                <h2>Faculty</h2><br/>
                <ul style={{position:"absolute",top:"200px",left:"500px",listStyle:"none"}}>
                    <li style={{position:"absolute",right:"50px"}}><button style={{width:"200px"}}>Faculty of Computing</button></li>
                    <li style={{position:"absolute",top:"110px",right:"50px"}}><button style={{width:"200px"}}>Faculty of Engineering</button></li>
                    <li style={{position:"absolute",top:"210px",right:"50px"}}><button style={{width:"200px"}}>Faculty of Business</button></li>
                </ul>
            </div>
        );
    }
}
;
export default ViewModulePage;