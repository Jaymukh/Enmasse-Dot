import React, { Suspense, useState, useMemo } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import { RouteConstants } from "./utils/constants/routeConstants";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

const customTheme = (outerTheme: any) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        typography: {
            "fontFamily": `"Poppins", sans-serif`,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': '#E0E3E7',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#111827',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor:
                                'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]:
                        {
                            borderColor:
                                'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        '&:before, &:after': {
                            borderBottom:
                                '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom:
                                '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom:
                                '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&:before': {
                            borderBottom:
                                '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom:
                                '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom:
                                '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });
    interface ProtectedRouteProps {
        isLogged: boolean;
        children: React.ReactNode;
    }
    
const ProtectedRoute: React.FC<ProtectedRouteProps> =  ({ isLogged, children }) => {
    if (!isLogged) {
        return <Navigate to={RouteConstants.login} />;
    }
    return <Outlet />;
}

const AppRouter = () => {
    const outerTheme = useTheme();

    const [isLogged, setIsLogged] = useState(false);
    const [visiblePanel, setVisiblePanel] = useState(0);
    const [overlay, setOverlay] = useState(true);
    const [showInfographic, setShowInfographic] =useState(0);
	

    const navigate = useNavigate();

    const Login = useMemo(() => React.lazy(() => import("./components/login/Login")), []);
    const HomeContainer = useMemo(() => React.lazy(() => import("./components/HomeContainer")), []);
    const DashboardContainer = useMemo(() => React.lazy(() => import("./components/DashboardContainer")), []);
    const StoryContainer = useMemo(() => React.lazy(() => import("./components/StoryContainer")), []);
    const ProfileContainer = useMemo(() => React.lazy(() => import("./components/ProfileContainer")), []);

    const handleLoggedIn = (flag: boolean) => {
        setIsLogged(flag);
        if (flag) {
            navigate(RouteConstants.root);
        }
    }

    const handleVisiblePanel = (index: number) => {
        setVisiblePanel(index);
    };
    
    const handleOverlay = (overlay:boolean) => {
        setOverlay(overlay);
    };

    const handleInfographic = (showInfographic: number) => {
		setShowInfographic(showInfographic);
	};

    return (
        <ThemeProvider theme={customTheme(outerTheme)}>
            <Suspense fallback={<div className=""></div>}>
                <Routes>
                    <Route path={RouteConstants.login} element={<Login handleLoggedIn={handleLoggedIn} />} />
                    <Route element={<ProtectedRoute isLogged={isLogged} children={undefined} />}>
                        <Route path={RouteConstants.root} element={<HomeContainer handleVisiblePanel={handleVisiblePanel} handleOverlay={handleOverlay} handleInfographic={handleInfographic} overlay={overlay} showInfographic={showInfographic} />} />
                        <Route path={RouteConstants.dashboards} element={<DashboardContainer handleVisiblePanel={handleVisiblePanel} handleOverlay={handleOverlay} handleInfographic={handleInfographic}  />} />
                        <Route path={RouteConstants.stories} element={<StoryContainer handleVisiblePanel={handleVisiblePanel} handleOverlay={handleOverlay} handleInfographic={handleInfographic} />} />
                        <Route path={RouteConstants.profile} element={<ProfileContainer handleVisiblePanel={handleVisiblePanel} handleOverlay={handleOverlay} handleInfographic={handleInfographic} visiblePanel={visiblePanel} />} />
                    </Route>
                </Routes>
            </Suspense >
        </ThemeProvider>
    );
};

export default AppRouter;
