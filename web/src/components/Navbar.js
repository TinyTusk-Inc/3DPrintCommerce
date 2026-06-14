import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index';
import { useCart } from '../hooks/index';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { itemCount } = useCart();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar disableGutters sx={{ minHeight: 'var(--navbar-height, 64px)' }}>
        <Container 
          maxWidth="lg"
          sx={{ display: 'flex', alignItems: 'center', height: '100%' }}
        >
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Link to="/" style={{ display: 'block', height: '100%' }}>
            <Box
              component="img"
              src={process.env.PUBLIC_URL + '/assets/logo_transperant.png'}
              alt="3D Print Commerce"
              sx={{ height: '100%', width: 'auto', maxHeight: 64 }}
            />
          </Link>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton color="inherit" component={Link} to="/products" aria-label="search-products">
            <SearchIcon />
          </IconButton>

          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/orders">
                Orders
              </Button>

              <IconButton color="inherit" component={Link} to="/cart" aria-label="cart">
                <Badge badgeContent={itemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {isAdmin && (
                <Button color="inherit" component={Link} to="/admin">
                  Admin
                </Button>
              )}

              <Button color="inherit" component={Link} to="/profile">
                {user?.name || 'Profile'}
              </Button>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <IconButton color="inherit" component={Link} to="/login" aria-label="login">
                <LoginIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/register" aria-label="register">
                <ShoppingCartIcon />
              </IconButton>
            </>
          )}
        </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
