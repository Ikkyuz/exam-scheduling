
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
            <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
            <h2 className="mt-4 text-4xl font-bold text-gray-800">Page Not Found</h2>
            <p className="mt-2 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
            <Link 
                to="/" 
                className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
