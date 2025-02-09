export function getSidebarState(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const sidebarState = cookieHeader?.split(";");

  if (sidebarState) {
    const state = sidebarState.filter((item) => item.includes("sidebar:state"));
    if (state.length > 0) {
      return state[0].split("=")[1] == "true";
    }
  }
  
  return null;
}