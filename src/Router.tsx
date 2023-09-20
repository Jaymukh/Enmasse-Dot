import React, { Suspense, useState, useMemo } from "react";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { RouteConstants } from "./constants";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, visiblePanelState, overlayState, showHelpState } from './states';


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
    auth: any;
    redirectPath: string;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, redirectPath, children }) => {
    if (!Object.keys(auth).length) {
        return <Navigate to={redirectPath} />;
    }
    return <Outlet />;
}

const Router = () => {
    const outerTheme = useTheme();
    const auth = useRecoilValue(authState);
    const setVisiblePanel = useSetRecoilState(visiblePanelState);
    const setOverlay = useSetRecoilState(overlayState);
    const setShowHelp = useSetRecoilState(showHelpState );
    // const [showInfographic, setShowInfographic] = useState(0);

    const Login = useMemo(() => React.lazy(() => import("./components/login/Login")), []);
    const UpdatePassword = useMemo(() => React.lazy(() => import("./components/login/UpdatePassword")), []);
    const HomeContainer = useMemo(() => React.lazy(() => import("./components/HomeContainer")), []);
    const DashboardContainer = useMemo(() => React.lazy(() => import("./components/DashboardContainer")), []);
    const StoryContainer = useMemo(() => React.lazy(() => import("./components/StoryContainer")), []);
    const ProfileContainer = useMemo(() => React.lazy(() => import("./components/ProfileContainer")), []);

    const handleVisiblePanel = (index: number) => {
        setVisiblePanel(index);
    };

    const handleOverlay = (overlay: boolean) => {
        setOverlay(overlay);
    };

    const handleHelp = (showHelp : number) => {
        setShowHelp(showHelp);
    };

    return (
        <ThemeProvider theme={customTheme(outerTheme)}>
            <Suspense fallback={<div className=""></div>}>
                <Routes>
                    <Route path={RouteConstants.login} element={<Login />} />
                    <Route element={<ProtectedRoute auth={auth} redirectPath={RouteConstants.login} children={undefined} />}>
                        <Route path={RouteConstants.update_password} element={<UpdatePassword />} />
                        <Route path={RouteConstants.root} element={<HomeContainer handleVisiblePanel={handleVisiblePanel} handleOverlay={handleOverlay} handleHelp={handleHelp} />} />
                        <Route path={RouteConstants.dashboards} element={<DashboardContainer handleVisiblePanel={handleVisiblePanel} handleOverlay={handleOverlay} handleHelp={handleHelp} />} />
                        <Route path={RouteConstants.stories} element={<StoryContainer handleVisiblePanel={handleVisiblePanel} handleOverlay={handleOverlay} handleHelp={handleHelp} />} />
                        <Route path={RouteConstants.profile} element={<ProfileContainer handleVisiblePanel={handleVisiblePanel} handleOverlay={handleOverlay} handleHelp={handleHelp} />} />
                    </Route>
                </Routes>
            </Suspense >
        </ThemeProvider>
    );
};

export default Router;
