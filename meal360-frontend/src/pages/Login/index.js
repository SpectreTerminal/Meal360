import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <Link to='/'>
      <Button variant='primary'>Login</Button>
    </Link>
  )
}