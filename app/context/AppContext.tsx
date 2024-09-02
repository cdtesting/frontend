'use client';
import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { client } from "@/graphql/apollo";
import { gql } from "@apollo/client";

export interface User {
    email: string;
    password: string;
    username: string;
}

interface Cart {
    items: any[];
    total: number;
    singleWeightPrice: number;
    Desktop: string;
    Web: string;
    App: string;
    Broadcast: string;
}

const AppContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
    cart: Cart;
    showCart: Boolean;
    addItem: (item: any, singleWeightPrice: number, cartDesktop: string, cartWeb: string, cartApp: string, cartBroadcast: string, user: User) => void;
    removeItem: (value: boolean) => void;
    resetCart: (value: boolean) => void;
    setShowCart: (value: boolean) => void;
    updateCart: (items: any[], singleWeightPrice: number) => void;
    setCartDesktop: (item: any) => void;
    setCartWeb: (item: any) => void;
    setCartApp: (item: any) => void;
    setCartBroadcast: (item: any) => void;
    setSingleWeightPrice: (item: any) => void;
    cartDesktop: string;
    cartWeb: string;
    cartApp: string;
    cartBroadcast: string;
    singleWeightPrice: number;
}>({
    user: null,
    setUser: () => { },
    cart: { items: [], total: 0, singleWeightPrice: 0, Desktop: '', Web: '', App: '', Broadcast: '' },
    showCart: false,
    addItem: () => { },
    removeItem: () => { },
    resetCart: () => { },
    setShowCart: () => { },
    updateCart: () => { },
    setCartDesktop: () => { },
    setSingleWeightPrice: () => { },
    singleWeightPrice: 0,
    setCartWeb: () => { },
    setCartApp: () => { },
    setCartBroadcast: () => { },
    cartWeb: '',
    cartDesktop: '',
    cartApp: '',
    cartBroadcast: '',
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const cartCookie = Cookie.get('cart') !== "undefined" ? Cookie.get('cart') : null;
    const [user, setUserState] = useState<User | null>(null);
    const [showCart, setShowCart] = useState(false);
    const [originalTotal, setOriginalTotal] = useState<number>(0);
    const [cart, setCart] = useState(cartCookie ? JSON.parse(cartCookie) : { items: [] });
    const [cartDesktop, setCartDesktop] = useState('');
    const [cartWeb, setCartWeb] = useState('');
    const [cartApp, setCartApp] = useState('');
    const [cartBroadcast, setCartBroadcast] = useState('');
    const [singleWeightPrice, setSingleWeightPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUser();
            if (userData !== undefined) {
                setUser(userData);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const total = calculateTotal(cart.items);
        setOriginalTotal(total);
        Cookie.set('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const userCookie = Cookie.get('user');
        if (userCookie) {
            setUserState(JSON.parse(userCookie));
        }
    }, []);

    const setUser = (user: User | null) => {
        if (user) {
            Cookie.set('user', JSON.stringify(user));
        } else {
            Cookie.remove('user');
        }
        setUserState(user);
    };

    const updateCart = (items: any[], singleWeightPrice: number) => {
        const total = items.reduce((acc, item) => {
            return acc + singleWeightPrice;
        }, 0);

        setCart((prevCart: any) => ({
            items: [...prevCart.items],
            total: total
        }));

        return total;
    };

    const addItem = (
        item: any,
        singleWeightPrice: number,
        cartDesktop: string,
        cartWeb: string,
        cartApp: string,
        cartBroadcast: string,
        user: User
    ) => {
        let newItem = cart.items.find((i: any) => i.font_name === item.font_name);
        if (!newItem) {
            newItem = {
                ...item,
                singleWeightPrice,
                Desktop: cartDesktop,
                Web: cartWeb,
                App: cartApp,
                Broadcast: cartBroadcast,
                user,
            };
            setCart((prevCart: any) => ({
                items: [...prevCart.items, newItem],
                total: prevCart.total + (singleWeightPrice || 0),
            }));
        }
    };

    const removeItem = (item: any) => {
        setCart((prevCart: any) => {
            const updatedItems = prevCart.items.filter((i: any) => i.font_name !== item.font_name);
            const total = calculateTotal(updatedItems);

            return {
                items: updatedItems,
                total: total,
            };
        });
    };

    const calculateTotal = (items: any[], singleWeightPrice?: any) => {
        const total = items.reduce((acc, item) => {
            const itemPrice = singleWeightPrice || 0;
            return acc + itemPrice;
        }, 0);

        return total;
    };

    const resetCart = () => {
        setCart({ items: [], total: 0 });
    };

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                cart,
                showCart,
                addItem,
                removeItem,
                resetCart,
                setShowCart,
                updateCart,
                setCartDesktop,
                cartDesktop,
                setCartWeb,
                setCartApp,
                cartWeb,
                cartApp,
                cartBroadcast,
                singleWeightPrice,
                setSingleWeightPrice,
                setCartBroadcast
            }}>
            {children}
        </AppContext.Provider>
    );
};

const getUser = async () => {
    const token = Cookie.get('token');
    if (!token) return null;
    const { data } = await client.query({
        query: gql`
      query {
        me {
          id
          email
          username
        }
      }
    `,
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    });
    return data.me;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined)
        throw new Error('useAppContext must be used within an AppProvider');
    return context;
};
