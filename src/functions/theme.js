const root = document.documentElement;

const dark = () => {
  root.style.setProperty('--primary-font-color', 'white');
  root.style.setProperty('--nav-background-color', 'rgba(0, 0, 0, 0.733)');
  root.style.setProperty('--primary-transparent-color', 'rgba(0, 0, 0, 0.93)');
  root.style.setProperty('--user-menu-font-color', 'white');
  root.style.setProperty('--primary-background-color', 'black');
  root.style.setProperty('--primary-border', '1px solid rgb(41, 41, 41)');
  root.style.setProperty('--secondary-border', '1px solid rgb(41, 41, 41)');
  root.style.setProperty('--loading-gradient', 'linear-gradient(to right, #000000, #353535)');
  root.style.setProperty('--messages-sidebar-background', 'rgba(0, 0, 0, 0.87)');
  root.style.setProperty('--messages-bubble-background', '#303030');
  root.style.setProperty('--menu-hover-color', 'rgba(255, 255, 255, 0.1)');
  root.style.setProperty('--notification-type-color', 'rgb(221, 221, 221)');
  root.style.setProperty('--home-card-overlay', 'rgba(0, 0, 0, 0.85)');
};

const light = () => {
  root.style.setProperty('--primary-font-color', 'black');
  root.style.setProperty('--nav-background-color', 'rgba(255, 255, 255, 0.733)');
  root.style.setProperty('--primary-transparent-color', 'rgba(255, 255, 255, 0.98)');
  root.style.setProperty('--user-menu-font-color', 'black');
  root.style.setProperty('--primary-background-color', 'white');
  root.style.setProperty('--primary-border', '1px solid rgb(41, 41, 41, 0)');
  root.style.setProperty('--secondary-border', '1px solid rgb(206, 206, 206)');
  root.style.setProperty('--loading-gradient', 'linear-gradient(to right, #ffffff, #c2c2c2)');
  root.style.setProperty('--messages-sidebar-background', 'rgba(255, 255, 255, 0.87)');
  root.style.setProperty('--messages-bubble-background', '#d3d3d3');
  root.style.setProperty('--menu-hover-color', 'rgba(0, 0, 0, 0.1)');
  root.style.setProperty('--notification-type-color', 'rgb(75, 75, 75)');
  root.style.setProperty('--home-card-overlay', 'rgba(255, 255, 255, 0.85)');
};

export { light, dark };
