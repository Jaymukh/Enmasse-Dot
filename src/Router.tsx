import React, { Suspense, useMemo } from "react";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { RouteConstants } from "./constants";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, visiblePanelState, overlayState, showHelpState } from './states';

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
    const auth = useRecoilValue(authState);
    const setVisiblePanel = useSetRecoilState(visiblePanelState);
    const setOverlay = useSetRecoilState(overlayState);
    const setShowHelp = useSetRecoilState(showHelpState );

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
    );
};

export default Router;
