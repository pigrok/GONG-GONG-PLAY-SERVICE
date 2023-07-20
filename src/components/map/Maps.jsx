import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';
import { useSelector } from 'react-redux';
import MarkPins from './MarkPins';
import useSetBoundary from '../../hooks/mapHooks/setBoundaries';

const Maps = () => {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null);
  const { latitude, longitude } = useSelector((state) => state.location);

  //===================================//
  // pins => 좌표를 찍을 핀 모음
  // boundary => 핀 전체를 고르게 보여주기 위한 border 설정
  const pins = useSelector((state) => state['10 Location'].data);
  const boundary = useSetBoundary(pins);
  // 이후 MarkPins에 props로 map과 boundary를 보내면
  // pin이 생성되면서 전체적으로 고르게 보여준다.
  //===================================//

  return (
    <>
      <StyledDiv>
        <MapDiv style={mapStyle}>
          <NaverMap
            defaultCenter={new navermaps.LatLng(latitude, longitude)}
            defaultZoom={9}
            ref={setMap}
            disableKineticPan={false}
          >
            <MarkPins map={map} boundary={boundary} />
          </NaverMap>
        </MapDiv>
      </StyledDiv>
    </>
  );
};

export default Maps;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 700px;
  height: 400px;
  border-radius: 15px;
  box-shadow: 1px 1px 10px 0 #aaa;

  #test,
  .marker-test {
    color: white;
    text-shadow: 1px 1px 1px #777;
    display: flex;
    flex-direction: column;
    position: absolute;
    font-size: 1rem;
  }
`;

const mapStyle = {
  width: '100%',
  height: '100%'
};
