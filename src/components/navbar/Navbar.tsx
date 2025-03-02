import { useState } from "react";
import {  AppBar,  Box,  Divider,  Drawer,  IconButton,  List,  ListItem,  ListItemButton,  ListItemIcon,  ListItemText,  Toolbar,  Typography} from "@mui/material";
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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
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

          <Typography variant="h6" noWrap className="title">
            Clipped drawer
          </Typography>

          <Box className="search-bar-container">
            <SearchBar />
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

      {/* Contenido principal */}
      <Box component="main" className="main-content">
        <Toolbar />
        <Typography className="text-content">
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris.
        </Typography>
      </Box>
    </Box>
  );
}
