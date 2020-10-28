import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useHeaderConditions = () => {
  const common = useSelector(state => state.common);
  const { provinceCode, channel } = common;
  const { provinceName } = common.provinceList.find(p => p.provinceId === provinceCode) || {};
  let { marketId } = common;
  let saasid = null;
  if (marketId) {
    [saasid, marketId] = marketId.split('-');
  } else {
    saasid = '';
    marketId = '';
  }
  return { provinceCode, provinceName, saasid, marketId, channel };
};


const useHeaderConditionsEffect = (callback, additionalDeps = []) => {
  const headerConditions = useHeaderConditions();

  useEffect(() => {
    callback(headerConditions);
  }, [
    headerConditions.channel,
    headerConditions.provinceCode,
    headerConditions.saasid,
    headerConditions.marketId,
    ...additionalDeps,
  ]);
};

export { useHeaderConditions, useHeaderConditionsEffect }
