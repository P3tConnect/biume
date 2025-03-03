export interface HeaderProps {
  isScrolled: boolean;
}

export interface SessionProps {
  session: any;
}

export interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export interface MobileUserMenuProps {
  session: any;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export interface MobileGuestMenuProps {
  setIsMobileMenuOpen: (value: boolean) => void;
}
