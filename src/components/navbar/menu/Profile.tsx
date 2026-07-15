import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
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
    <div className="flex items-center gap-6">
      <div className="relative">
        {false && (
          <Badge variant="secondary" className="absolute -top-2 -right-2 rounded-full px-1 text-xs">
            0
          </Badge>
        )}
        <ShoppingCart className="size-6" />
      </div>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default Profile
