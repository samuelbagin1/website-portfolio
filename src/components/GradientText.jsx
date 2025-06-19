const GradientText = ({ 
  children, 
  className = "", 
  gradient = "default",
  direction = "default",
  padding = "p-2",
  ...props 
}) => {
  // Base styles for gradient text
  const baseStyles = "inline-block h-full text-transparent bg-clip-text";
  
  // Direction mappings
  const directions = {
    default: "", // Use the original direction from the gradient
    "to-right": "bg-gradient-to-r",
    "to-left": "bg-gradient-to-l", 
    "to-top": "bg-gradient-to-t",
    "to-bottom": "bg-gradient-to-b",
    "to-top-right": "bg-gradient-to-tr",
    "to-top-left": "bg-gradient-to-tl",
    "to-bottom-right": "bg-gradient-to-br",
    "to-bottom-left": "bg-gradient-to-bl"
  };
  
  // WebGradients Collection - All 180 gradients with exact CSS conversions
  const gradients = {
    default: "from-blue-600 to-indigo-200",
    
    // WebGradients Collection (001-180) - Colors only, direction will be applied separately
    gradient1: "from-[#ff9a9e] to-[#fad0c4]", // Warm Flame
    gradient2: "from-[#a18cd1] to-[#fbc2eb]", // Night Fade
    gradient3: "from-[#fad0c4] to-[#ffd1ff]", // Spring Warmth
    gradient4: "from-[#ffecd2] to-[#fcb69f]", // Juicy Peach
    gradient5: "from-[#ff8177] via-[#ff8c7f] via-[#f99185] via-[#cf556c] to-[#b12a5b]", // Young Passion
    gradient6: "from-[#ff9a9e] to-[#fecfef]", // Lady Lips
    gradient7: "from-[#f6d365] to-[#fda085]", // Sunny Morning
    gradient8: "from-[#fbc2eb] to-[#a6c1ee]", // Rainy Ashville
    gradient9: "from-[#fdcbf1] to-[#e6dee9]", // Frozen Dreams
    gradient10: "from-[#a1c4fd] to-[#c2e9fb]", // Winter Neva
    gradient11: "from-[#d4fc79] to-[#96e6a1]", // Dusty Grass
    gradient12: "from-[#84fab0] to-[#8fd3f4]", // Tempting Azure
    gradient13: "from-[#cfd9df] to-[#e2ebf0]", // Heavy Rain
    gradient14: "from-[#a6c0fe] to-[#f68084]", // Amy Crisp
    gradient15: "from-[#fccb90] to-[#d57eeb]", // Mean Fruit
    gradient16: "from-[#e0c3fc] to-[#8ec5fc]", // Deep Blue
    gradient17: "from-[#f093fb] to-[#f5576c]", // Ripe Malinka
    gradient18: "from-[#fdfbfb] to-[#ebedee]", // Cloudy Knoxville
    gradient19: "from-[#4facfe] to-[#00f2fe]", // Malibu Beach
    gradient20: "from-[#43e97b] to-[#38f9d7]", // New Life
    gradient21: "from-[#fa709a] to-[#fee140]", // True Sunset
    gradient22: "from-[#30cfd0] to-[#330867]", // Morpheus Den
    gradient23: "from-[#a8edea] to-[#fed6e3]", // Rare Wind
    gradient24: "from-[#5ee7df] to-[#b490ca]", // Near Moon
    gradient25: "from-[#d299c2] to-[#fef9d7]", // Wild Apple
    gradient26: "from-[#f5f7fa] to-[#c3cfe2]", // Saint Petersburg
    gradient27: "from-[#16d9e3] via-[#30c7ec] to-[#46aef7]", // Arielle's Smile
    gradient28: "from-[#667eea] to-[#764ba2]", // Plum Plate
    gradient29: "from-[#fdfcfb] to-[#e2d1c3]", // Everlasting Sky
    gradient30: "from-[#89f7fe] to-[#66a6ff]", // Happy Fisher
    gradient31: "from-[#fddb92] to-[#d1fdff]", // Blessing
    gradient32: "from-[#9890e3] to-[#b1f4cf]", // Sharpeye Eagle
    gradient33: "from-[#ebc0fd] to-[#d9ded8]", // Ladoga Bottom
    gradient34: "from-[#96fbc4] to-[#f9f586]", // Lemon Gate
    gradient35: "from-[#2af598] to-[#009efd]", // Itmeo Branding
    gradient36: "from-[#cd9cf2] to-[#f6f3ff]", // Zeus Miracle
    gradient37: "from-[#e4afcb] via-[#e2c58b] via-[#c2ce9c] to-[#7edbdc]", // Old Hat
    gradient38: "from-[#b465da] via-[#cf6cc9] to-[#ee609c]", // Star Wine
    gradient39: "from-[#6a11cb] to-[#2575fc]", // Deep Blue
    gradient40: "from-[#DCD9D4] to-[#DCD9D4]", // Coup de Grace (simplified)
    gradient41: "from-[#37ecba] to-[#72afd3]", // Happy Acid
    gradient42: "from-[#ebbba7] to-[#cfc7f8]", // Awesome Pine
    gradient43: "from-[#fff1eb] to-[#ace0f9]", // New York
    gradient44: "from-[#eea2a2] via-[#bbc1bf] via-[#57c6e1] via-[#b49fda] to-[#7ac5d8]", // Shy Rainbow
    gradient45: "from-[#989898] to-[#989898]", // Loon Crest (simplified)
    gradient46: "from-[#c471f5] to-[#fa71cd]", // Mixed Hopes
    gradient47: "from-[#48c6ef] to-[#6f86d6]", // Fly High
    gradient48: "from-[#f78ca0] via-[#f9748f] via-[#fd868c] to-[#fe9a8b]", // Strong Bliss
    gradient49: "from-[#feada6] to-[#f5efef]", // Fresh Milk
    gradient50: "from-[#e6e9f0] to-[#eef1f5]", // Snow Again
    gradient51: "from-[#accbee] to-[#e7f0fd]", // February Ink
    gradient52: "from-[#e9defa] to-[#fbfcdb]", // Kind Steel
    gradient53: "from-[#c1dfc4] to-[#deecdd]", // Soft Grass
    gradient54: "from-[#0ba360] to-[#3cba92]", // Grown Early
    gradient55: "from-[#00c6fb] to-[#005bea]", // Sharp Blues
    gradient56: "from-[#74ebd5] to-[#9face6]", // Shady Water
    gradient57: "from-[#6a85b6] to-[#bac8e0]", // Dirty Beauty
    gradient58: "from-[#a3bded] to-[#6991c7]", // Great Whale
    gradient59: "from-[#9795f0] to-[#fbc8d4]", // Teen Notebook
    gradient60: "from-[#a7a6cb] via-[#8989ba] to-[#8989ba]", // Polite Rumors
    gradient61: "from-[#3f51b1] via-[#5a55ae] via-[#7b5fac] via-[#8f6aae] via-[#a86aa4] via-[#cc6b8e] via-[#f18271] via-[#f3a469] to-[#f7c978]", // Sweet Period
    gradient62: "from-[#fcc5e4] via-[#fda34b] via-[#ff7882] via-[#c8699e] via-[#7046aa] via-[#0c1db8] to-[#020f75]", // Wide Matrix
    gradient63: "from-[#dbdcd7] via-[#dddcd7] via-[#e2c9cc] via-[#e7627d] via-[#b8235a] via-[#801357] via-[#3d1635] to-[#1c1a27]", // Soft Cherish
    gradient64: "from-[#f43b47] to-[#453a94]", // Red Salvation
    gradient65: "from-[#4fb576] via-[#44c489] via-[#28a9ae] via-[#28a2b7] via-[#4c7788] via-[#6c4f63] to-[#432c39]", // Burning Spring
    gradient66: "from-[#0250c5] to-[#d43f8d]", // Night Party
    gradient67: "from-[#88d3ce] to-[#6e45e2]", // Sky Glider
    gradient68: "from-[#d9afd9] to-[#97d9e1]", // Heaven Peach
    gradient69: "from-[#7028e4] to-[#e5b2ca]", // Purple Division
    gradient70: "from-[#13547a] to-[#80d0c7]", // Aqua Splash
    gradient71: "from-[#BDBBBE] to-[#9D9EA3]", // Above Clouds (simplified)
    gradient72: "from-[#505285] via-[#585e92] via-[#65689f] via-[#7474b0] via-[#7e7ebb] via-[#8389c7] via-[#9795d4] via-[#a2a1dc] to-[#b5aee4]", // Spiky Naga
    gradient73: "from-[#ff0844] to-[#ffb199]", // Love Kiss
    gradient74: "from-[#C9CCD3] to-[#C9CCD3]", // Sharp Glass (simplified)
    gradient75: "from-[#93a5cf] to-[#e4efe9]", // Clean Mirror
    gradient76: "from-[#434343] to-[#000000]", // Premium Dark
    gradient77: "from-[#0c3483] via-[#a2b6df] via-[#6b8cce] to-[#a2b6df]", // Cold Evening
    gradient78: "from-[#93a5cf] to-[#e4efe9]", // Cochiti Lake
    gradient79: "from-[#92fe9d] to-[#00c9ff]", // Summer Games
    gradient80: "from-[#ff758c] to-[#ff7eb3]", // Passionate Bed
    gradient81: "from-[#868f96] to-[#596164]", // Mountain Rock
    gradient82: "from-[#c79081] to-[#dfa579]", // Desert Hump
    gradient83: "from-[#8baaaa] to-[#ae8b9c]", // Jungle Day
    gradient84: "from-[#f83600] to-[#f9d423]", // Phoenix Start
    gradient85: "from-[#b721ff] to-[#21d4fd]", // October Silence
    gradient86: "from-[#6e45e2] to-[#88d3ce]", // Faraway River
    gradient87: "from-[#d558c8] to-[#24d292]", // Alchemist Lab
    gradient88: "from-[#abecd6] to-[#fbed96]", // Over Sun
    gradient89: "from-[#d5d4d0] via-[#eeeeec] via-[#efeeec] to-[#e9e9e7]", // Premium White
    gradient90: "from-[#5f72bd] to-[#9b23ea]", // Mars Party
    gradient91: "from-[#09203f] to-[#537895]", // Eternal Constance
    gradient92: "from-[#ddd6f3] to-[#faaca8]", // Japan Blush
    gradient93: "from-[#dcb0ed] to-[#99c99c]", // Smiling Rain
    gradient94: "from-[#f3e7e9] to-[#e3eeff]", // Cloudy Apple
    gradient95: "from-[#c71d6f] to-[#d09693]", // Big Mango
    gradient96: "from-[#96deda] to-[#50c9c3]", // Healthy Water
    gradient97: "from-[#f77062] to-[#fe5196]", // Amour Amour
    gradient98: "from-[#c4c5c7] via-[#dcdddf] to-[#ebebeb]", // Risky Concrete
    gradient99: "from-[#a8caba] to-[#5d4157]", // Strong Stick
    gradient100: "from-[#29323c] to-[#485563]", // Vicious Stance
    gradient101: "from-[#16a085] to-[#f4d03f]", // Palo Alto
    gradient102: "from-[#ff5858] to-[#f09819]", // Happy Memories
    gradient103: "from-[#2b5876] to-[#4e4376]", // Midnight Bloom
    gradient104: "from-[#00cdac] to-[#8ddad5]", // Crystalline
    gradient105: "from-[#BCC5CE] to-[#929EAD]", // Raccoon Back (simplified)
    gradient106: "from-[#4481eb] to-[#04befe]", // Party Bliss
    gradient107: "from-[#dad4ec] to-[#f3e7e9]", // Confident Cloud
    gradient108: "from-[#874da2] to-[#c43a30]", // Le Cocktail
    gradient109: "from-[#4481eb] to-[#04befe]", // River City
    gradient110: "from-[#e8198b] to-[#c7eafd]", // Frozen Berry
    gradient111: "from-[#EADFDF] to-[#ECE2DF]", // Elegance (simplified)
    gradient112: "from-[#f794a4] to-[#fdd6bd]", // Child Care
    gradient113: "from-[#64b3f4] to-[#c2e59c]", // Flying Lemon
    gradient114: "from-[#3b41c5] via-[#a981bb] to-[#ffc8a9]", // New Retrowave
    gradient115: "from-[#0fd850] to-[#f9f047]", // Hidden Jaguar
    gradient116: "from-[#d3d3d3] via-[#e0e0e0] via-[#efefef] via-[#d9d9d9] to-[#bcbcbc]", // Above The Sky
    gradient117: "from-[#ee9ca7] to-[#ffdde1]", // Nega
    gradient118: "from-[#3ab5b0] via-[#3d99be] to-[#56317a]", // Dense Water
    gradient119: "from-[#CDDCDC] to-[#CDDCDC]", // Chemic Aqua (simplified)
    gradient120: "from-[#209cff] to-[#68e0cf]", // Seashore
    gradient121: "from-[#bdc2e8] to-[#e6dee9]", // Marble Wall
    gradient122: "from-[#e6b980] to-[#eacda3]", // Cheerful Caramel
    gradient123: "from-[#1e3c72] to-[#2a5298]", // Night Sky
    gradient124: "from-[#d5dee7] via-[#ffafbd] to-[#c9ffbf]", // Magic Lake
    gradient125: "from-[#9be15d] to-[#00e3ae]", // Young Grass
    gradient126: "from-[#ed6ea0] to-[#ec8c69]", // Colorful Peach
    gradient127: "from-[#ffc3a0] to-[#ffafbd]", // Gentle Care
    gradient128: "from-[#cc208e] to-[#6713d2]", // Plum Bath
    gradient129: "from-[#b3ffab] to-[#12fff7]", // Happy Unicorn
    gradient130: "from-[#D5DEE7] via-[#E8EBF2] to-[#E2E7ED]", // Full Metal (simplified)
    gradient131: "from-[#65bd60] via-[#5ac1a8] via-[#3ec6ed] via-[#b7ddb7] to-[#fef381]", // African Field
    gradient132: "from-[#243949] to-[#517fa4]", // Solid Stone
    gradient133: "from-[#fc6076] to-[#ff9a44]", // Orange Juice
    gradient134: "from-[#dfe9f3] to-[#ffffff]", // Glass Water
    gradient135: "from-[#323232] via-[#3F3F3F] to-[#1C1C1C]", // Slick Carbon (simplified)
    gradient136: "from-[#00dbde] to-[#fc00ff]", // North Miracle
    gradient137: "from-[#f9d423] to-[#ff4e50]", // Fruit Blend
    gradient138: "from-[#50cc7f] to-[#f5d100]", // Millennium Pine
    gradient139: "from-[#0acffe] to-[#495aff]", // High Flight
    gradient140: "from-[#616161] to-[#9bc5c3]", // Mole Hall
    gradient141: "from-[#E4E4E1] to-[#E4E4E1]", // Earl Gray (simplified)
    gradient142: "from-[#3d3393] via-[#2b76b9] via-[#2cacd1] to-[#35eb93]", // Space Shift
    gradient143: "from-[#df89b5] to-[#bfd9fe]", // Forest Inei
    gradient144: "from-[#ed6ea0] to-[#ec8c69]", // Royal Garden
    gradient145: "from-[#d7d2cc] to-[#304352]", // Rich Metal
    gradient146: "from-[#e14fad] to-[#f9d423]", // Juicy Cake
    gradient147: "from-[#b224ef] to-[#7579ff]", // Smart Indigo
    gradient148: "from-[#c1c161] to-[#d4d4b1]", // Sand Strike
    gradient149: "from-[#ec77ab] to-[#7873f5]", // Norse Beauty
    gradient150: "from-[#007adf] to-[#00ecbc]", // Aqua Guidance
    gradient151: "from-[#20E2D7] to-[#F9FEA5]", // Sun Veggie
    gradient152: "from-[#2CD8D5] via-[#C5C1FF] to-[#FFBAC3]", // Sea Lord
    gradient153: "from-[#2CD8D5] via-[#6B8DD6] to-[#8E37D7]", // Black Sea
    gradient154: "from-[#DFFFCD] via-[#90F9C4] to-[#39F3BB]", // Grass Shampoo
    gradient155: "from-[#5D9FFF] via-[#B8DCFF] to-[#6BBBFF]", // Landing Aircraft
    gradient156: "from-[#A8BFFF] to-[#884D80]", // Witch Dance
    gradient157: "from-[#5271C4] via-[#B19FFF] to-[#ECA1FE]", // Sleepless Night
    gradient158: "from-[#FFE29F] via-[#FFA99F] to-[#FF719A]", // Angel Care
    gradient159: "from-[#22E1FF] via-[#1D8FE1] to-[#625EB1]", // Crystal River
    gradient160: "from-[#B6CEE8] to-[#F578DC]", // Soft Lipstick
    gradient161: "from-[#FFFEFF] to-[#D7FFFE]", // Salt Mountain
    gradient162: "from-[#E3FDF5] to-[#FFE6FA]", // Perfect White
    gradient163: "from-[#7DE2FC] to-[#B9B6E5]", // Fresh Oasis
    gradient164: "from-[#CBBACC] to-[#2580B3]", // Strict November
    gradient165: "from-[#B7F8DB] to-[#50A7C2]", // Morning Salad
    gradient166: "from-[#7085B6] via-[#87A7D9] to-[#DEF3F8]", // Deep Relief
    gradient167: "from-[#77FFD2] via-[#6297DB] to-[#1EECFF]", // Sea Strike
    gradient168: "from-[#AC32E4] via-[#7918F2] to-[#4801FF]", // Night Call
    gradient169: "from-[#D4FFEC] via-[#57F2CC] to-[#4596FB]", // Supreme Sky
    gradient170: "from-[#9EFBD3] via-[#57E9F2] to-[#45D4FB]", // Light Blue
    gradient171: "from-[#473B7B] via-[#3584A7] to-[#30D2BE]", // Mind Crawl
    gradient172: "from-[#65379B] via-[#886AEA] to-[#6457C6]", // Lily Meadow
    gradient173: "from-[#A445B2] via-[#D41872] to-[#FF0066]", // Sugar Lollipop
    gradient174: "from-[#7742B2] via-[#F180FF] to-[#FD8BD9]", // Sweet Dessert
    gradient175: "from-[#FF3CAC] via-[#562B7C] to-[#2B86C5]", // Magic Ray
    gradient176: "from-[#FF057C] via-[#8D0B93] to-[#321575]", // Teen Party
    gradient177: "from-[#FF057C] via-[#7C64D5] to-[#4CC3FF]", // Frozen Heat
    gradient178: "from-[#69EACB] via-[#EACCF8] to-[#6654F1]", // Gagarin View
    gradient179: "from-[#231557] via-[#44107A] via-[#FF1361] to-[#FFF800]", // Fabled Sunset
    gradient180: "from-[#3D4E81] via-[#5753C9] to-[#6E7FF3]", // Perfect Blue
    
    custom: "" // For custom gradients passed via className
  };

  // Get the direction class or use default 'to-right' if no direction specified
  const getDirectionClass = () => {
    if (direction === "default") {
      return "bg-gradient-to-r"; // Default direction
    }
    return directions[direction] || "bg-gradient-to-r";
  };
  
  // Combine all classes
  const gradientClass = gradient === "custom" ? "" : `${getDirectionClass()} ${gradients[gradient]}`;
  const textClasses = `${baseStyles} ${gradientClass} ${padding} ${className}`;
  
  return (
    <div className={textClasses} {...props}>
      {children}
    </div>
  );
};

export default GradientText;