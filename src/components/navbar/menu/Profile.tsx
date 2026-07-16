import CartSheet from '@/components/cart/CartSheet'
import { Button } from '@/components/ui/button'
import WishlistSheet from '@/components/wishlist/WishlistSheet'
import { Link } from 'react-router-dom'

const Profile = ({ isAuthenticated, handleLogout }: { isAuthenticated: boolean; handleLogout: () => void }) => {
  if (!isAuthenticated) {
    return (
      <Button asChild>
        <Link to="/login">Login</Link>
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <WishlistSheet />
      <CartSheet />
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default Profile
