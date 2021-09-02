import { Link } from "react-router-dom";



const Category = ({brandName}: {brandName: string}) => {

    return (
        <div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><Link to={`/${brandName}`}>{brandName}</Link></h4>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    {/* <h4 className="panel-title"><a href="#">{shoes.name}</a></h4> */}
                </div>
            </div>
            {/* {isClicked && <a onClick={() => setIsClicked(false)} href='/'>Go back</a>} */}
        </div>
    )
}

export default Category;
