// src/pages/LoginPage.tsx (Adjusted)

// ... (Imports, loginSchema, LoginFormInputs เหมือนเดิม) ...
import { useAuth, API } from '../hooks/useAuth';
// ...

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // ... (useForm และ isAuthenticated check เหมือนเดิม) ...

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await API.post('/auth/login', data);
      
      // **ปรับปรุงการอ่าน Response ตามโครงสร้างของ Backend**
      const { token, user_data } = response.data;
      
      // **สมมติว่า user_data มีโครงสร้างตรงกับ User Type**
      if (token && user_data) {
        login(token, user_data); 
        navigate('/dashboard', { replace: true });
      } else {
        alert('Login failed: Token or user data missing in response.');
      }

    } catch (error: any) {
      console.error('Login Failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  // ... (Return JSX เหมือนเดิม) ...
};

export default LoginPage;