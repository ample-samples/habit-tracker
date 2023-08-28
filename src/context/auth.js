import { useNavigate } from'react-router-dom'

export const AuthProvider = ({children, isLoggedIn}) => {
  const navigate = useNavigate();

  if(isLoggedIn) {
    return children
  } else {
    navigate('/login')
  }
}
