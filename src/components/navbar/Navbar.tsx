import { useState } from "react";
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon, MoveToInbox as InboxIcon, Mail as MailIcon } from "@mui/icons-material";
import SearchBar from "./SearchBar";
import "./Navbar.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box className="drawer-content">
      <List>
        {["Home","Dashboard", "CodeQR"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={`${text.toLowerCase()}`}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className="navbar-container">
      {/* Navbar superior */}
      <AppBar position="fixed" className="navbar">
        <Toolbar className="toolbar">
          {/* Botón de menú en móviles */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className="menu-button"
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h4"
            noWrap
            className="title"
            sx={{
              paddingLeft: {
                xs: 0,  
                sm: "175px", 
              },
              paddingRight: {
                xs: 2, 
                sm: 3, 
              },

              display: {
                xs: 'none',  // Oculta el componente en pantallas extra pequeñas
                s: 'block', 
              },
            }}
          >
            Dashboard
        </Typography>

          <Box className="search-bar-container">
            <Typography>
              Test
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para escritorio */}
      <Drawer
        variant="permanent"
        className="drawer"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>

      {/* Drawer para móviles */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
