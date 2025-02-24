import { useNavigate } from "react-router-dom";

const NotFound = () => {
    let navigate = useNavigate();
    return (
        <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <button onClick={() => navigate('/')}>Close</button>
        </div>
    );
};

export default NotFound;