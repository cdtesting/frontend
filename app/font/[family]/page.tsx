// Main Component with "use client" directive
'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { centsToPounds } from '@/utils/centsToDollars';
import { User, useAppContext } from '@/app/context/AppContext';
import {
  GET_FONT_BY_FAMILY_NAME,
  GET_PLATFORMS,
} from '@/graphql/queries';
import {
  GetFontByFamilyNameQuery,
  GetFontByFamilyNameQueryVariables,
  Get_PlatformQuery,
  Get_PlatformQueryVariables,
} from '@/src/__generated__/graphql';
import { StyledAddToCart, StyledFontList, StyledFonts } from '../font.styles';

const StyledMultiples = styled.div`
  margin: 20px 0;
  select {
    margin-bottom: 10px;
  }
`;

const Font = () => {
  const [desktopMultiplier, setDesktopMultiplier] = useState<number>(0);
  const [webMultiplier, setWebMultiplier] = useState<number>(0);
  const [appMultiplier, setAppMultiplier] = useState<number>(0);
  const [broadcastMultiplier, setBroadcastMultiplier] = useState<number>(0);
  const [desktopPrice, setDesktopPrice] = useState<number>(0);
  const [webPrice, setWebPrice] = useState<number>(0);
  const [appPrice, setAppPrice] = useState<number>(0);
  const [broadcastPrice, setBroadcastPrice] = useState<number>(0);
  const [showFonts, setShowFonts] = useState(false);
  const [basePrice, setBasePrice] = useState(0);

  const params = useParams();
  const uid = params.family
    ? Array.isArray(params.family)
      ? params.family[0]
      : params.family.toString()
    : '';

  const { data: fontData, loading: fontLoading } = useQuery<
    GetFontByFamilyNameQuery,
    GetFontByFamilyNameQueryVariables
  >(GET_FONT_BY_FAMILY_NAME, {
    variables: { query_name: uid },
  });

  const { data: desktopData, loading: platformLoading } = useQuery<
    Get_PlatformQuery,
    Get_PlatformQueryVariables
  >(GET_PLATFORMS);

  const fonts = fontData?.fonts?.data[0]?.attributes;

  const platformData = desktopData?.platforms?.data ?? [];

  const desktopIndex = platformData.findIndex(
    (platform) => platform?.attributes?.platform_name === 'Desktop'
  );
  const webIndex = platformData.findIndex(
    (platform) => platform?.attributes?.platform_name === 'Web'
  );
  const appIndex = platformData.findIndex(
    (platform) => platform?.attributes?.platform_name === 'App'
  );
  const broadcastIndex = platformData.findIndex(
    (platform) => platform?.attributes?.platform_name === 'Broadcast'
  );

  const getPlatformArray = (index: number) =>
    index !== -1 ? platformData[index]?.attributes?.values : [];

  const desktopArray = getPlatformArray(desktopIndex);
  const webArray = getPlatformArray(webIndex);
  const appArray = getPlatformArray(appIndex);
  const broadcastArray = getPlatformArray(broadcastIndex);

  const {
    addItem,
    setShowCart,
    setCartDesktop,
    setCartWeb,
    setSingleWeightPrice,
    singleWeightPrice,
    updateCart,
    cart,
    setCartApp,
    setCartBroadcast,
    cartDesktop,
    cartWeb,
    cartApp,
    cartBroadcast,
    user
  } = useAppContext();

  useEffect(() => {
    if (fonts?.font_values && fonts.font_values.length > 0) {
      const firstFontValue = fonts.font_values[0];
      if (firstFontValue && 'price' in firstFontValue) {
        setBasePrice(firstFontValue.price ?? 0);
      }
    }
  }, [fonts]);

  useEffect(() => {
    setSingleWeightPrice(desktopPrice + webPrice + appPrice + broadcastPrice);
    console.log('---singleWeightPrice---', singleWeightPrice)
  }, [desktopPrice, webPrice, appPrice, broadcastPrice]);

  useEffect(() => {
    if (desktopMultiplier !== 0 || webMultiplier !== 0 || appMultiplier !== 0 || broadcastMultiplier !== 0) {
      updateCart(cart.items, singleWeightPrice);
    }
  }, [desktopMultiplier, webMultiplier, singleWeightPrice, appMultiplier, broadcastMultiplier]);

  const handleAddItem = (
    font: any,
    singleWeightPrice: number,
    cartDesktop: string,
    cartWeb: string,
    cartApp: string,
    cartBroadcast: string,
    user: User
  ) => {
    addItem(font, singleWeightPrice, cartDesktop, cartWeb, cartApp, cartBroadcast, user);
    setShowCart(true);
  };

  const handleMultiplierChange = (
    setMultiplier: React.Dispatch<React.SetStateAction<number>>,
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    setCart: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseFloat(event.target.value);
    setMultiplier(value);
    setPrice(basePrice * value);
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    setCart(selectedText);
    setShowFonts(true);
  };

  return (
    <>
      <div>
        <h2 className="fontName">{uid}</h2>
        <StyledMultiples>
          <div>
            <h3>Desktop</h3>
            <select
              value={desktopMultiplier}
              onChange={(e) => handleMultiplierChange(setDesktopMultiplier, setDesktopPrice, setCartDesktop, e)}
            >
              <option value="0">Select number of cpus</option>
              {desktopArray?.map((desktop, index) => (
                <option key={index} value={desktop?.value!}>
                  {desktop?.option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Web</h3>
            <select
              value={webMultiplier}
              onChange={(e) => handleMultiplierChange(setWebMultiplier, setWebPrice, setCartWeb, e)}
            >
              <option value="0">Select number of web pages</option>
              {webArray?.map((web, index) => (
                <option key={index} value={web?.value!}>
                  {web?.option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>App</h3>
            <select
              value={appMultiplier}
              onChange={(e) => handleMultiplierChange(setAppMultiplier, setAppPrice, setCartApp, e)}
            >
              <option value="0">How many downloads</option>
              {appArray?.map((app,index) => (
                <option key={index} value={app?.value!}>
                  {app?.option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Broadcast</h3>
            <select
              value={broadcastMultiplier}
              onChange={(e) => handleMultiplierChange(setBroadcastMultiplier, setBroadcastPrice, setCartBroadcast, e)}
            >
              <option value="0">How many continents are you broadcasting to</option>
              {broadcastArray?.map((broadcast, index) => (
                <option key={index} value={broadcast?.value!}>
                  {broadcast?.option}
                </option>
              ))}
            </select>
          </div>
        </StyledMultiples>
        {showFonts && (
          <StyledFonts>
            {fontLoading ? (
              <p>Loading...</p>
            ) : (
              <StyledFontList>
                {fonts?.font_values?.map((font, index) => (
                  font && (
                    <li key={index}>
                      {font?.font_name} £{centsToPounds(singleWeightPrice)}
                      <StyledAddToCart
                        onClick={() =>
                          handleAddItem(font as any, singleWeightPrice, cartDesktop, cartWeb, cartApp, cartBroadcast, user!)
                        }
                      >
                        Add to cart
                      </StyledAddToCart>
                    </li>
                  )
                ))}
              </StyledFontList>
            )}
          </StyledFonts>
        )}
      </div>
    </>
  );
};

export default Font;