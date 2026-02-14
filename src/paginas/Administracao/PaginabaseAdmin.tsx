import DashboardIcon from '@mui/icons-material/Dashboard'; // Opcional: ícone para o título
import { AppBar, Box, Button, Container, Divider, Paper, Toolbar, Typography } from "@mui/material";
import { Outlet, Link as RouterLink } from 'react-router-dom';

const PaginaBaseAdmin = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#fbfbfb' }}>
            <AppBar position="sticky" elevation={2}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ 
                                fontWeight: 800, 
                                mr: 4, 
                                display: 'flex', 
                                alignItems: 'center',
                                gap: 1 
                            }}
                        >
                            <DashboardIcon /> Painel do Administrador
                        </Typography>

                        <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2, mr: 2 }} />

                        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                            {[
                                { label: 'Restaurantes', to: '/admin/restaurantes' },
                                { label: 'Novo Restaurante', to: '/admin/restaurantes/novo' },
                                { label: 'Pratos', to: '/admin/pratos' },
                                { label: 'Novo Prato', to: '/admin/pratos/novo' },
                            ].map((item) => (
                                <Button
                                    key={item.label}
                                    component={RouterLink}
                                    to={item.to}
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: 500,
                                        px: 2,
                                        '&:hover': { 
                                            backgroundColor: 'rgba(255,255,255,0.15)',
                                            borderRadius: '8px'
                                        } 
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: { xs: 2, md: 4 }, 
                        borderRadius: 3, 
                        border: '1px solid #e0e0e0',
                        boxShadow: '0px 4px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    <Outlet />
                </Paper>
            </Container>

            <Box component="footer" sx={{ py: 3, textAlign: 'center', mt: 'auto' }}>
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} - Painel Administrativo
                </Typography>
            </Box>
        </Box>
    );
}

export default PaginaBaseAdmin;