'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu
} from '@/components/ui/sidebar';
import { AppSidebarHeader } from '@/components/sidebar/sidebarHeader';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  children?: React.ReactNode;
}

export function AppSidebar({ children, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="floating" {...props}>
      <AppSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">{children}</SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
