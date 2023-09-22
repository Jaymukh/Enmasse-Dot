import React, { Suspense, useMemo } from "react";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { RouteConstants } from "./constants";
import { useRecoilValue } from "recoil";
import { authState } from './states';

interface ProtectedRouteProps {
    auth: any;
    redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, redirectPath }) => {
    if (!Object.keys(auth).length) {
        return <Navigate to={redirectPath} />;
    }
    return <Outlet />;
}

const Router = () => {
    const auth = useRecoilValue(authState);

    const Login = useMemo(() => React.lazy(() => import("./components/login/Login")), []);
    const UpdatePassword = useMemo(() => React.lazy(() => import("./components/login/UpdatePassword")), []);
    const HomeContainer = useMemo(() => React.lazy(() => import("./components/HomeContainer")), []);
    const DashboardContainer = useMemo(() => React.lazy(() => import("./components/DashboardContainer")), []);
    const StoryContainer = useMemo(() => React.lazy(() => import("./components/StoryContainer")), []);
    const ProfileContainer = useMemo(() => React.lazy(() => import("./components/ProfileContainer")), []);


    return (
        <Suspense fallback={<div className=""></div>}>
            <Routes>
                <Route path={RouteConstants.login} element={<Login />} />
                <Route element={<ProtectedRoute auth={auth} redirectPath={RouteConstants.login} />}>
                    <Route path={RouteConstants.update_password} element={<UpdatePassword />} />
                    <Route path={RouteConstants.root} element={<HomeContainer />} />
                    <Route path={RouteConstants.dashboards} element={<DashboardContainer />} />
                    <Route path={RouteConstants.stories} element={<StoryContainer />} />
                    <Route path={RouteConstants.profile} element={<ProfileContainer />} />
                    <Route path={RouteConstants.settings} element={<ProfileContainer />} />
                    <Route path={RouteConstants.invite} element={<ProfileContainer />} />
                </Route>
            </Routes>
        </Suspense >
    );
};

export default Router;
