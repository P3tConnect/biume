// import { motion } from "framer-motion";
// import {
//   Button,
//   Switch,
//   Accordion,
//   AccordionContent,
//   AccordionTrigger,
//   Avatar,
//   Label,
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
//   Credenza,
//   CredenzaClose,
//   CredenzaContent,
//   CredenzaHeader,
//   CredenzaTrigger,
//   CredenzaDescription,
//   CredenzaFooter,
//   CredenzaBody,
//   CredenzaTitle,
//   Skeleton,
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
//   Textarea,
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
//   ScrollArea,
//   ScrollBar,
//   Menubar,
//   MenubarCheckboxItem,
//   MenubarContent,
//   MenubarGroup,
//   MenubarItem,
//   MenubarLabel,
//   MenubarPortal,
//   MenubarRadioGroup,
//   MenubarRadioItem,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarSub,
//   MenubarSubContent,
//   MenubarSubTrigger,
//   MenubarTrigger,
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
//   MenubarMenu,
//   Toaster,
//   Calendar,
//   Input,
//   Separator,
//   Progress,
//   RadioGroup,
//   RadioGroupItem,
//   Select,
//   SelectGroup,
//   DatePicker,
//   Command,
//   CommandItem,
//   CommandShortcut,
//   CommandSeparator,
//   CommandGroup,
//   CommandDialog,
//   CommandInput,
//   CommandList,
//   CommandEmpty,
//   Alert,
//   AlertTitle,
//   AlertDescription
// } from "@/components";
//
// // Button
//
// export const AnimatedButton = motion(Button, { forwardMotionProps: true })
//
// // end Button
//
// // Switch
//
// export const AnimatedSwitch = motion(Switch, { forwardMotionProps: true })
//
// // end Switch
//
// // Accordion
//
// export const AnimatedAccordion = motion(Accordion, { forwardMotionProps: true })
//
// export const AnimatedAccordionContent = motion(AccordionContent, { forwardMotionProps: true })
//
// export const AnimatedAccordionTrigger = motion(AccordionTrigger, { forwardMotionProps: true })
//
// // end Accordion
//
// export const AnimatedAvatar = motion(Avatar, { forwardMotionProps: true })
//
// export const AnimatedLabel = motion(Label, { forwardMotionProps: true })
//
// // Dropdown
//
// export const AnimatedDropdown = motion(DropdownMenu, { forwardMotionProps: true })
//
// export const AnimatedDropdownContent = motion(DropdownMenuContent, { forwardMotionProps: true })
//
// export const AnimatedDropdownItem = motion(DropdownMenuItem, { forwardMotionProps: true })
//
// // end Dropdown
//
// // HoverCard
//
// export const AnimatedHoverCard = motion(HoverCard, { forwardMotionProps: true })
//
// export const AnimatedHoverCardContent = motion(HoverCardContent, { forwardMotionProps: true })
//
// export const AnimatedHoverCardTrigger = motion(HoverCardTrigger, { forwardMotionProps: true })
//
// // end HoverCard
//
// // Drawer
//
// export const AnimatedDrawer = motion(Credenza, { forwardMotionProps: true })
//
// export const AnimatedDrawerContent = motion(CredenzaContent, { forwardMotionProps: true })
//
// export const AnimatedDrawerTrigger = motion(CredenzaTrigger, { forwardMotionProps: true })
//
// export const AnimatedDrawerCloseButton = motion(CredenzaClose, { forwardMotionProps: true })
//
// export const AnimatedDrawerHeader = motion(CredenzaHeader, { forwardMotionProps: true })
//
// export const AnimatedDrawerFooter = motion(CredenzaFooter, { forwardMotionProps: true })
//
// export const AnimatedDrawerDescription = motion(CredenzaDescription, { forwardMotionProps: true })
//
// export const AnimatedDrawerBody = motion(CredenzaBody, { forwardMotionProps: true })
//
// export const AnimatedDrawerTitle = motion(CredenzaTitle, { forwardMotionProps: true })
//
// // end Drawer
//
// // Skeleton
//
// export const AnimatedSkeleton = motion(Skeleton, { forwardMotionProps: true })
//
// // end Skeleton
//
// // Popover
//
// export const AnimatedPopover = motion(Popover, { forwardMotionProps: true })
//
// export const AnimatedPopoverContent = motion(PopoverContent, { forwardMotionProps: true })
//
// export const AnimatedPopoverTrigger = motion(PopoverTrigger, { forwardMotionProps: true })
//
// // end Popover
//
// // Textarea
//
// export const AnimatedTextarea = motion(Textarea, { forwardMotionProps: true })
//
// // end Textarea
//
// // Pagination
//
// export const AnimatedPagination = motion(Pagination, { forwardMotionProps: true })
//
// export const AnimatedPaginationContent = motion(PaginationContent, { forwardMotionProps: true })
//
// export const AnimatedPaginationItem = motion(PaginationItem, { forwardMotionProps: true })
//
// export const AnimatedPaginationPrevious = motion(PaginationPrevious, { forwardMotionProps: true })
//
// export const AnimatedPaginationNext = motion(PaginationNext, { forwardMotionProps: true })
//
// export const AnimatedPaginationEllipsis = motion(PaginationEllipsis, { forwardMotionProps: true })
//
// export const AnimatedPaginationLink = motion(PaginationLink, { forwardMotionProps: true })
//
// // end Pagination
//
// // ScrollArea
//
// export const AnimatedScrollArea = motion(ScrollArea, { forwardMotionProps: true })
//
// export const AnimatedScrollBar = motion(ScrollBar, { forwardMotionProps: true })
//
// // end ScrollArea
//
// // MenuBar
//
// export const AnimatedMenuBar = motion(Menubar, { forwardMotionProps: true })
//
// export const AnimatedMenuBarItem = motion(MenubarItem, { forwardMotionProps: true })
//
// export const AnimatedMenuBarLabel = motion(MenubarLabel, { forwardMotionProps: true })
//
// export const AnimatedMenuBarSeparator = motion(MenubarSeparator, { forwardMotionProps: true })
//
// export const AnimatedMenuBarSubContent = motion(MenubarSubContent, { forwardMotionProps: true })
//
// export const AnimatedMenuBarContent = motion(MenubarContent, { forwardMotionProps: true })
//
// export const AnimatedMenuBarCheckboxItem = motion(MenubarCheckboxItem, { forwardMotionProps: true })
//
// export const AnimatedMenuBarRadioGroup = motion(MenubarRadioGroup, { forwardMotionProps: true })
//
// export const AnimatedMenuBarRadioItem = motion(MenubarRadioItem, { forwardMotionProps: true })
//
// export const AnimatedMenuBarPortal = motion(MenubarPortal, { forwardMotionProps: true })
//
// export const AnimatedMenuBarTrigger = motion(MenubarTrigger, { forwardMotionProps: true })
//
// export const AnimatedMenuBarSubTrigger = motion(MenubarSubTrigger, { forwardMotionProps: true })
//
// export const AnimatedMenuBarMenu = motion(MenubarMenu, { forwardMotionProps: true })
//
// export const AnimatedMenuBarGroup = motion(MenubarGroup, { forwardMotionProps: true })
//
// export const AnimatedMenuBarSub = motion(MenubarSub, { forwardMotionProps: true })
//
// export const AnimatedMenuBarShortcut = motion(MenubarShortcut, { forwardMotionProps: true })
//
// // end MenuBar
//
// // NavigationMenu
//
// export const AnimatedNavigationMenuTrigger = motion(NavigationMenuTrigger, { forwardMotionProps: true })
//
// export const AnimatedNavigationMenuContent = motion(NavigationMenuContent, { forwardMotionProps: true })
//
// export const AnimatedNavigationMenuIndicator = motion(NavigationMenuIndicator, { forwardMotionProps: true })
//
// export const AnimatedNavigationMenuLink = motion(NavigationMenuLink, { forwardMotionProps: true })
//
// export const AnimatedNavigationMenuViewport = motion(NavigationMenuViewport, { forwardMotionProps: true })
//
// export const AnimatedNavigationMenu = motion(NavigationMenu, { forwardMotionProps: true })
//
// export const AnimatedNavigationMenuList = motion(NavigationMenuList, { forwardMotionProps: true })
//
// // end NavigationMenu
//
// // Sonner
//
// export const AnimatedSonner = motion(Toaster, { forwardMotionProps: true })
//
// // end Sonner
//
// // Calendar
//
// export const AnimatedCalendar = motion(Calendar, { forwardMotionProps: true })
//
// // end Calendar
//
// // Input
//
// export const AnimatedInput = motion(Input, { forwardMotionProps: true })
//
// // end Input
//
// // Separator
//
// export const AnimatedSeparator = motion(Separator, { forwardMotionProps: true })
//
// // end Separator
//
// // Progress
//
// export const AnimatedProgress = motion(Progress, { forwardMotionProps: true })
//
// // end Progress
//
// // RadioGroup
//
// export const AnimatedRadioGroup = motion(RadioGroup, { forwardMotionProps: true })
//
// export const AnimatedRadioGroupItem = motion(RadioGroupItem, { forwardMotionProps: true })
//
// // end RadioGroup
//
// // Select
//
// export const AnimatedSelect = motion(Select, { forwardMotionProps: true })
//
// export const AnimatedSelectGroup = motion(SelectGroup, { forwardMotionProps: true })
//
// // end Select
//
// // DatePicker
//
// export const AnimatedDatePicker = motion(DatePicker, { forwardMotionProps: true })
//
// // end DatePicker
//
// // Command
//
// export const AnimatedCommand = motion(Command, { forwardMotionProps: true })
//
// export const AnimatedCommandItem = motion(CommandItem, { forwardMotionProps: true })
//
// export const AnimatedCommandShortcut = motion(CommandShortcut, { forwardMotionProps: true })
//
// export const AnimatedCommandSeparator = motion(CommandSeparator, { forwardMotionProps: true })
//
// export const AnimatedCommandGroup = motion(CommandGroup, { forwardMotionProps: true })
//
// export const AnimatedCommandDialog = motion(CommandDialog, { forwardMotionProps: true })
//
// export const AnimatedCommandInput = motion(CommandInput, { forwardMotionProps: true })
//
// export const AnimatedCommandList = motion(CommandList, { forwardMotionProps: true })
//
// export const AnimatedCommandEmpty = motion(CommandEmpty, { forwardMotionProps: true })
//
// // end Command
//
// // Alert
//
// export const AnimatedAlert = motion(Alert, { forwardMotionProps: true })
//
// export const AnimatedAlertTitle = motion(AlertTitle, { forwardMotionProps: true })
//
// export const AnimatedAlertDescription = motion(AlertDescription, { forwardMotionProps: true })
//
// // end Alert
