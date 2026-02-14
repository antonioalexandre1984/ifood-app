import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import MenuIcon from '@mui/icons-material/Menu'; // Ícone do hambúrguer
import PostAddIcon from '@mui/icons-material/PostAdd';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {
    AppBar, Box, Button, Container, Divider, Drawer, IconButton,
    List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Paper, Toolbar, Typography
} from "@mui/material";
import { useState } from 'react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';

const PaginaBaseAdmin = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuItems = [
        { label: 'Restaurantes', to: '/admin/restaurantes', icon: <RestaurantIcon /> },
        { label: 'Novo Restaurante', to: '/admin/restaurantes/novo', icon: <AddBusinessIcon /> },
        { label: 'Pratos', to: '/admin/pratos', icon: <DinnerDiningIcon /> },
        { label: 'Novo Prato', to: '/admin/pratos/novo', icon: <PostAddIcon /> },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Conteúdo do Menu Lateral (Mobile)
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, fontWeight: 800 }}>
                MENU
            </Typography>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton 
                            component={RouterLink} 
                            to={item.to}
                            selected={location.pathname === item.to}
                        >
                            <ListItemIcon sx={{ color: 'primary.main' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#fbfbfb' }}>
            <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        {/* Logo / Título */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                component={RouterLink}
                                to="/admin"
                                sx={{ 
                                    fontWeight: 800, 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: 1.5,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    letterSpacing: '-0.5px'
                                }}
                            >
                                <DashboardIcon sx={{ color: '#fff' }} /> 
                                <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    Painel Admin
                                </Box>
                            </Typography>
                        </Box>

                        {/* Menu Desktop (Escondido em XS e SM) */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.to;
                                return (
                                    <Button
                                        key={item.label}
                                        component={RouterLink}
                                        to={item.to}
                                        startIcon={item.icon}
                                        sx={{ 
                                            color: 'white', 
                                            fontWeight: isActive ? 700 : 400,
                                            px: 2,
                                            textTransform: 'none',
                                            backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                                            borderRadius: '8px',
                                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' } 
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                );
                            })}
                        </Box>

                        {/* Botão Hambúrguer (Apenas Mobile) */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={{ display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Componente Drawer (Menu Lateral Mobile) */}
            <Box component="nav">
                <Drawer
                    anchor="right"
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }} // Melhor performance em mobile
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Conteúdo Principal */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: { xs: 2, md: 4 }, 
                        borderRadius: 4, 
                        border: '1px solid #e0e0e0',
                        background: '#ffffff',
                        boxShadow: '0px 10px 30px rgba(0,0,0,0.03)'
                    }}
                >
                    <Outlet />
                </Paper>
            </Container>

            <Box component="footer" sx={{ py: 4, textAlign: 'center', mt: 'auto', opacity: 0.7 }}>
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} — Sistema de Gestão Gastronômica
                </Typography>
            </Box>
        </Box>
    );
}

export default PaginaBaseAdmin;