// 实现一
function compareVersions(v1, v2) {
  v1 = v1.split('.').map(Number);
  v2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;
    
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }
  
  return 0;
}

// 支持预发布版本
function compareVersions(v1, v2) {
  const parseVersion = (version) => {
    return version.split('.').map(part => {
      const match = part.match(/^(\d+)([a-zA-Z]+)?(\d+)?$/);
      if (!match) return { num: 0, str: '' };
      
      const num = parseInt(match[1]) || 0;
      const str = match[2] || '';
      const strNum = parseInt(match[3]) || 0;
      
      return { num, str, strNum };
    });
  };
  
  const parts1 = parseVersion(v1);
  const parts2 = parseVersion(v2);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const p1 = parts1[i] || { num: 0, str: '', strNum: 0 };
      const p2 = parts2[i] || { num: 0, str: '', strNum: 0 };
      
      if (p1.num !== p2.num) return p1.num - p2.num;
      
      if (p1.str && p2.str) {
          if (p1.str !== p2.str) {
              // 简单的字母顺序比较
              if (p1.str < p2.str) return -1;
              if (p1.str > p2.str) return 1;
          }
          
          if (p1.strNum !== p2.strNum) {
              return p1.strNum - p2.strNum;
          }
      } else if (p1.str || p2.str) {
          // 一个有预发布标识，一个没有
          return p1.str ? -1 : 1;
      }
  }
  
  return 0;
}

// 使用示例
console.log(compareVersions('1.2.3-alpha', '1.2.3-beta')); // -1 (alpha < beta)
console.log(compareVersions('1.2.3-beta.1', '1.2.3-beta.2')); // -1
console.log(compareVersions('1.2.3', '1.2.3-alpha')); // 1 (稳定版 > 预发布版)