let menuTitle = $state('Counters');

export const menuTitleState = {
    get: () => menuTitle,
    set: (title: string) => {
        menuTitle = title;
    },
};
