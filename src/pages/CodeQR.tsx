import { Typography } from "@mui/material";

export default function QR() {
    return (
        <div style={{ paddingTop: "75px" }}>
            <Typography 
                variant="h4" 
                component="h1" 
                align="center"
                sx={{ 
                    paddingLeft: {
                        xs: 0,  // Sin padding en pantallas pequeñas
                        sm: "175px",  // Padding en pantallas grandes
                    },
                    paddingRight: {
                        xs: 2,  // Padding en pantallas pequeñas
                        sm: 3,  // Padding en pantallas grandes
                    }
                }}
            >
                Hacer QR
            </Typography>
        </div>
    );
}
