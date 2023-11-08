import React, { useEffect, useState } from 'react';
import Drawer from '../../ui/Drawer';
import '../../../App.css';
import { useRecoilValue } from "recoil";
import { useSettingsService } from '../../../services';
import { AllSettingsState, User } from "../../../states";
import Select, { SelectSize } from '../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Input } from '../../ui/input/Input';

interface RoadmapProps {
    roadmapDrawerOpen: boolean,
    handleRoadmapDrawer: (roadmapDrawerOpen: boolean) => void;
}

export default function Roadmap({roadmapDrawerOpen, handleRoadmapDrawer}: RoadmapProps) {

    return (
        <Drawer
            id='roadmap'
            title='Roadmap'
            isOpen={roadmapDrawerOpen}
            toggleFunction={handleRoadmapDrawer}
        >
            
        </Drawer>
    );
}