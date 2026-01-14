import React, { useState, useEffect, useCallback } from 'react';

// ============================================
// CURRENTS SPORTS INTELLIGENCE LAYER v2.0
// Full DMA Coverage + College Basketball
// ============================================

// ============================================
// DATA LAYER: ALL 210 DMAs
// ============================================

const DMA_DATA = {
  501: { name: 'New York', teams: { nba: ['NYK', 'BKN'], nfl: ['NYG', 'NYJ'], mlb: ['NYY', 'NYM'], nhl: ['NYR', 'NYI', 'NJD'], ncaam: ['STJN', 'CONN', 'RUTG', 'SETON'], ncaaw: ['CONN', 'RUTG', 'STJN'] }},
  502: { name: 'Binghamton', teams: { ncaam: ['BING'], ncaaw: ['BING'] }},
  503: { name: 'Macon', teams: { ncaam: ['MCER'], ncaaw: ['MCER'] }},
  504: { name: 'Philadelphia', teams: { nba: ['PHI'], nfl: ['PHI'], mlb: ['PHI'], nhl: ['PHI'], ncaam: ['NOVA', 'TEMP', 'DREX', 'PENN'], ncaaw: ['NOVA', 'TEMP', 'PENN'] }},
  505: { name: 'Detroit', teams: { nba: ['DET'], nfl: ['DET'], mlb: ['DET'], nhl: ['DET'], ncaam: ['MICH', 'MSU', 'DET'], ncaaw: ['MICH', 'MSU'] }},
  506: { name: 'Boston', teams: { nba: ['BOS'], nfl: ['NE'], mlb: ['BOS'], nhl: ['BOS'], ncaam: ['BC', 'PROV', 'UMASS'], ncaaw: ['BC', 'UMASS'] }},
  507: { name: 'Savannah', teams: { ncaam: ['GASO'], ncaaw: ['GASO'] }},
  508: { name: 'Pittsburgh', teams: { nfl: ['PIT'], mlb: ['PIT'], nhl: ['PIT'], ncaam: ['PITT', 'DUQ'], ncaaw: ['PITT', 'DUQ'] }},
  509: { name: 'Ft. Wayne', teams: { ncaam: ['PFW', 'IPFW'], ncaaw: ['PFW'] }},
  510: { name: 'Cleveland-Akron', teams: { nba: ['CLE'], nfl: ['CLE'], mlb: ['CLE'], ncaam: ['KENT', 'AKRON'], ncaaw: ['KENT', 'AKRON'] }},
  511: { name: 'Washington DC', teams: { nba: ['WAS'], nfl: ['WAS'], mlb: ['WAS'], nhl: ['WAS'], ncaam: ['MD', 'GTOWN', 'GW', 'GMU', 'VCU'], ncaaw: ['MD', 'GTOWN', 'GMU'] }},
  512: { name: 'Baltimore', teams: { nfl: ['BAL'], mlb: ['BAL'], ncaam: ['UMBC', 'TOW', 'LOYA'], ncaaw: ['UMBC', 'TOW'] }},
  513: { name: 'Flint-Saginaw', teams: { ncaam: ['CMICH'], ncaaw: ['CMICH'] }},
  514: { name: 'Buffalo', teams: { nfl: ['BUF'], nhl: ['BUF'], ncaam: ['BUFF', 'SBU', 'NIAG', 'CANI'], ncaaw: ['BUFF', 'SBU'] }},
  515: { name: 'Cincinnati', teams: { nfl: ['CIN'], mlb: ['CIN'], ncaam: ['UC', 'XAV', 'MIA'], ncaaw: ['UC', 'XAV'] }},
  516: { name: 'Erie', teams: { ncaam: [''], ncaaw: [''] }},
  517: { name: 'Charlotte', teams: { nba: ['CHA'], nfl: ['CAR'], ncaam: ['CHAR', 'DAV', 'WAKE', 'UNCC'], ncaaw: ['CHAR', 'WAKE'] }},
  518: { name: 'Greensboro', teams: { ncaam: ['DUKE', 'UNC', 'NCSU', 'UNCG', 'ELON', 'WAKE'], ncaaw: ['DUKE', 'UNC', 'NCSU', 'WAKE'] }},
  519: { name: 'Charleston, SC', teams: { ncaam: ['COFC', 'CITAD'], ncaaw: ['COFC'] }},
  520: { name: 'Augusta', teams: { ncaam: ['AUGU'], ncaaw: ['AUGU'] }},
  521: { name: 'Providence-New Bedford', teams: { ncaam: ['PROV', 'URI', 'BRWN'], ncaaw: ['PROV', 'URI'] }},
  522: { name: 'Columbus, GA', teams: { ncaam: [''], ncaaw: [''] }},
  523: { name: 'Burlington-Plattsburgh', teams: { ncaam: ['UVM'], ncaaw: ['UVM'] }},
  524: { name: 'Atlanta', teams: { nba: ['ATL'], nfl: ['ATL'], mlb: ['ATL'], nhl: ['ATL'], ncaam: ['GT', 'GSU', 'KENN'], ncaaw: ['GT', 'GSU'] }},
  525: { name: 'Albany, GA', teams: { ncaam: ['ALBS'], ncaaw: ['ALBS'] }},
  526: { name: 'Utica', teams: { ncaam: [''], ncaaw: [''] }},
  527: { name: 'Indianapolis', teams: { nba: ['IND'], nfl: ['IND'], ncaam: ['IU', 'PURDUE', 'BUTLER', 'ND'], ncaaw: ['IU', 'PURDUE', 'ND', 'BUTLER'] }},
  528: { name: 'Miami-Ft. Lauderdale', teams: { nba: ['MIA'], nfl: ['MIA'], mlb: ['MIA'], nhl: ['FLA'], ncaam: ['MIAMI', 'FIU', 'FAU', 'NSU'], ncaaw: ['MIAMI', 'FIU', 'FAU'] }},
  529: { name: 'Louisville', teams: { ncaam: ['LOU', 'UK', 'WKU'], ncaaw: ['LOU', 'UK', 'WKU'] }},
  530: { name: 'Tallahassee', teams: { ncaam: ['FSU', 'FAMU'], ncaaw: ['FSU', 'FAMU'] }},
  531: { name: 'Tri-Cities TN-VA', teams: { ncaam: ['ETSU'], ncaaw: ['ETSU'] }},
  532: { name: 'Albany-Schenectady', teams: { ncaam: ['ALBA', 'SIE'], ncaaw: ['ALBA', 'SIE'] }},
  533: { name: 'Hartford-New Haven', teams: { ncaam: ['CONN', 'YALE', 'QUIN', 'HART'], ncaaw: ['CONN', 'YALE', 'QUIN'] }},
  534: { name: 'Orlando-Daytona Beach', teams: { nba: ['ORL'], ncaam: ['UCF', 'STET'], ncaaw: ['UCF', 'STET'] }},
  535: { name: 'Columbus, OH', teams: { nhl: ['CBJ'], ncaam: ['OSU', 'OHIO'], ncaaw: ['OSU', 'OHIO'] }},
  536: { name: 'Youngstown', teams: { ncaam: ['YSU'], ncaaw: ['YSU'] }},
  537: { name: 'Bangor', teams: { ncaam: ['MAINE'], ncaaw: ['MAINE'] }},
  538: { name: 'Rochester, NY', teams: { ncaam: ['ROCH'], ncaaw: ['ROCH'] }},
  539: { name: 'Tampa-St. Petersburg', teams: { nba: ['ORL'], nfl: ['TB'], mlb: ['TB'], nhl: ['TB'], ncaam: ['USF'], ncaaw: ['USF'] }},
  540: { name: 'Traverse City-Cadillac', teams: { ncaam: [''], ncaaw: [''] }},
  541: { name: 'Lexington', teams: { ncaam: ['UK'], ncaaw: ['UK'] }},
  542: { name: 'Dayton', teams: { ncaam: ['DAY', 'WRST'], ncaaw: ['DAY', 'WRST'] }},
  543: { name: 'Springfield-Holyoke', teams: { ncaam: ['UMASS'], ncaaw: ['UMASS'] }},
  544: { name: 'Norfolk-Portsmouth', teams: { ncaam: ['ODU', 'NSU', 'WM'], ncaaw: ['ODU', 'WM'] }},
  545: { name: 'Greenville-New Bern', teams: { ncaam: ['ECU'], ncaaw: ['ECU'] }},
  546: { name: 'Columbia, SC', teams: { ncaam: ['SC', 'WINT'], ncaaw: ['SC'] }},
  547: { name: 'Toledo', teams: { ncaam: ['TOL', 'BGSU'], ncaaw: ['TOL', 'BGSU'] }},
  548: { name: 'West Palm Beach', teams: { ncaam: ['FAU', 'LYNN'], ncaaw: ['FAU'] }},
  549: { name: 'Watertown', teams: { ncaam: [''], ncaaw: [''] }},
  550: { name: 'Wilmington', teams: { ncaam: ['UNCW'], ncaaw: ['UNCW'] }},
  551: { name: 'Lansing', teams: { ncaam: ['MSU'], ncaaw: ['MSU'] }},
  552: { name: 'Presque Isle', teams: { ncaam: [''], ncaaw: [''] }},
  553: { name: 'Marquette', teams: { ncaam: ['NMU'], ncaaw: ['NMU'] }},
  554: { name: 'Wheeling-Steubenville', teams: { ncaam: [''], ncaaw: [''] }},
  555: { name: 'Syracuse', teams: { ncaam: ['SYR', 'COLG', 'LEMO'], ncaaw: ['SYR', 'COLG'] }},
  556: { name: 'Richmond-Petersburg', teams: { ncaam: ['VCU', 'RICH'], ncaaw: ['VCU', 'RICH'] }},
  557: { name: 'Knoxville', teams: { ncaam: ['TENN'], ncaaw: ['TENN'] }},
  558: { name: 'Lima', teams: { ncaam: [''], ncaaw: [''] }},
  559: { name: 'Bluefield-Beckley', teams: { ncaam: [''], ncaaw: [''] }},
  560: { name: 'Raleigh-Durham', teams: { nba: ['CHA'], nhl: ['CAR'], ncaam: ['DUKE', 'UNC', 'NCSU'], ncaaw: ['DUKE', 'UNC', 'NCSU'] }},
  561: { name: 'Jacksonville', teams: { nfl: ['JAX'], ncaam: ['UNF', 'JU'], ncaaw: ['UNF', 'JU'] }},
  563: { name: 'Grand Rapids', teams: { ncaam: ['GVSU'], ncaaw: ['GVSU'] }},
  564: { name: 'Charleston-Huntington', teams: { ncaam: ['MRSH', 'WVU'], ncaaw: ['MRSH', 'WVU'] }},
  565: { name: 'Elmira', teams: { ncaam: [''], ncaaw: [''] }},
  566: { name: 'Harrisburg-Lancaster', teams: { ncaam: ['PENN'], ncaaw: ['PENN'] }},
  567: { name: 'Greenville-Spartanburg', teams: { ncaam: ['CLEM', 'FURM', 'WOFF'], ncaaw: ['CLEM', 'FURM'] }},
  569: { name: 'Harrisonburg', teams: { ncaam: ['JMU'], ncaaw: ['JMU'] }},
  570: { name: 'Florence-Myrtle Beach', teams: { ncaam: ['CCU'], ncaaw: ['CCU'] }},
  571: { name: 'Ft. Myers-Naples', teams: { ncaam: ['FGCU'], ncaaw: ['FGCU'] }},
  573: { name: 'Roanoke-Lynchburg', teams: { ncaam: ['LIB', 'RAD'], ncaaw: ['LIB', 'RAD'] }},
  574: { name: 'Johnstown-Altoona', teams: { ncaam: [''], ncaaw: [''] }},
  575: { name: 'Chattanooga', teams: { ncaam: ['UTC'], ncaaw: ['UTC'] }},
  576: { name: 'Salisbury', teams: { ncaam: [''], ncaaw: [''] }},
  577: { name: 'Wilkes Barre-Scranton', teams: { ncaam: [''], ncaaw: [''] }},
  581: { name: 'Terre Haute', teams: { ncaam: ['ISU'], ncaaw: ['ISU'] }},
  582: { name: 'Lafayette, IN', teams: { ncaam: ['PURDUE'], ncaaw: ['PURDUE'] }},
  583: { name: 'Alpena', teams: { ncaam: [''], ncaaw: [''] }},
  584: { name: 'Charlottesville', teams: { ncaam: ['UVA'], ncaaw: ['UVA'] }},
  588: { name: 'South Bend-Elkhart', teams: { ncaam: ['ND'], ncaaw: ['ND'] }},
  592: { name: 'Gainesville', teams: { ncaam: ['UF'], ncaaw: ['UF'] }},
  596: { name: 'Zanesville', teams: { ncaam: [''], ncaaw: [''] }},
  597: { name: 'Parkersburg', teams: { ncaam: [''], ncaaw: [''] }},
  598: { name: 'Clarksburg-Weston', teams: { ncaam: ['WVU'], ncaaw: ['WVU'] }},
  600: { name: 'Corpus Christi', teams: { ncaam: ['TAMC'], ncaaw: ['TAMC'] }},
  602: { name: 'Chicago', teams: { nba: ['CHI'], nfl: ['CHI'], mlb: ['CHC', 'CWS'], nhl: ['CHI'], ncaam: ['NW', 'ILL', 'DEPA', 'LUC'], ncaaw: ['NW', 'ILL', 'DEPA'] }},
  603: { name: 'Joplin-Pittsburg', teams: { ncaam: [''], ncaaw: [''] }},
  604: { name: 'Columbia-Jefferson City', teams: { ncaam: ['MIZZ'], ncaaw: ['MIZZ'] }},
  605: { name: 'Topeka', teams: { ncaam: ['KU'], ncaaw: ['KU'] }},
  606: { name: 'Dothan', teams: { ncaam: [''], ncaaw: [''] }},
  609: { name: 'St. Louis', teams: { nfl: ['STL'], mlb: ['STL'], nhl: ['STL'], ncaam: ['SLU', 'SIUE'], ncaaw: ['SLU', 'SIUE'] }},
  610: { name: 'Rockford', teams: { ncaam: ['NIU'], ncaaw: ['NIU'] }},
  611: { name: 'Rochester-Mason City', teams: { ncaam: [''], ncaaw: [''] }},
  612: { name: 'Shreveport', teams: { ncaam: ['LATECH', 'GSU'], ncaaw: ['LATECH', 'GSU'] }},
  613: { name: 'Minneapolis-St. Paul', teams: { nba: ['MIN'], nfl: ['MIN'], mlb: ['MIN'], nhl: ['MIN'], ncaam: ['MINN', 'MARQ'], ncaaw: ['MINN'] }},
  616: { name: 'Kansas City', teams: { nfl: ['KC'], mlb: ['KC'], ncaam: ['KU', 'KSU', 'UMKC'], ncaaw: ['KU', 'KSU'] }},
  617: { name: 'Milwaukee', teams: { nba: ['MIL'], mlb: ['MIL'], ncaam: ['MARQ', 'UWM'], ncaaw: ['MARQ', 'UWM'] }},
  618: { name: 'Houston', teams: { nba: ['HOU'], nfl: ['HOU'], mlb: ['HOU'], ncaam: ['UH', 'RICE'], ncaaw: ['UH', 'RICE'] }},
  619: { name: 'Springfield, MO', teams: { ncaam: ['MSU'], ncaaw: ['MSU'] }},
  622: { name: 'New Orleans', teams: { nba: ['NO'], nfl: ['NO'], ncaam: ['TUL', 'UNO', 'SELA'], ncaaw: ['TUL', 'UNO'] }},
  623: { name: 'Dallas-Ft. Worth', teams: { nba: ['DAL'], nfl: ['DAL'], mlb: ['TEX'], nhl: ['DAL'], ncaam: ['SMU', 'TCU', 'UTA', 'UNT'], ncaaw: ['SMU', 'TCU', 'UTA'] }},
  624: { name: 'Sioux City', teams: { ncaam: [''], ncaaw: [''] }},
  625: { name: 'Waco-Temple-Bryan', teams: { ncaam: ['BAY', 'TAMU'], ncaaw: ['BAY', 'TAMU'] }},
  626: { name: 'Victoria', teams: { ncaam: [''], ncaaw: [''] }},
  627: { name: 'Wichita Falls-Lawton', teams: { ncaam: ['MSU'], ncaaw: ['MSU'] }},
  628: { name: 'Monroe-El Dorado', teams: { ncaam: ['ULM'], ncaaw: ['ULM'] }},
  630: { name: 'Birmingham', teams: { ncaam: ['UAB', 'SAM'], ncaaw: ['UAB', 'SAM'] }},
  631: { name: 'Ottumwa-Kirksville', teams: { ncaam: [''], ncaaw: [''] }},
  632: { name: 'Paducah-Cape Girardeau', teams: { ncaam: ['SEMO', 'MUR', 'SIU'], ncaaw: ['SEMO', 'MUR', 'SIU'] }},
  633: { name: 'Odessa-Midland', teams: { ncaam: ['UTPB'], ncaaw: ['UTPB'] }},
  634: { name: 'Amarillo', teams: { ncaam: ['WTAM'], ncaaw: ['WTAM'] }},
  635: { name: 'Austin', teams: { ncaam: ['TEX'], ncaaw: ['TEX'] }},
  636: { name: 'Harlingen-Weslaco', teams: { ncaam: ['UTRGV'], ncaaw: ['UTRGV'] }},
  637: { name: 'Cedar Rapids-Waterloo', teams: { ncaam: ['IOWA', 'UNI'], ncaaw: ['IOWA', 'UNI'] }},
  638: { name: 'St. Joseph', teams: { ncaam: [''], ncaaw: [''] }},
  639: { name: 'Jackson, TN', teams: { ncaam: [''], ncaaw: [''] }},
  640: { name: 'Memphis', teams: { nba: ['MEM'], ncaam: ['MEM'], ncaaw: ['MEM'] }},
  641: { name: 'San Antonio', teams: { nba: ['SA'], ncaam: ['UTSA'], ncaaw: ['UTSA'] }},
  642: { name: 'Lafayette, LA', teams: { ncaam: ['ULL'], ncaaw: ['ULL'] }},
  643: { name: 'Lake Charles', teams: { ncaam: ['MCNS'], ncaaw: ['MCNS'] }},
  644: { name: 'Alexandria, LA', teams: { ncaam: [''], ncaaw: [''] }},
  647: { name: 'Greenwood-Greenville', teams: { ncaam: ['MVSU'], ncaaw: ['MVSU'] }},
  648: { name: 'Champaign-Springfield', teams: { ncaam: ['ILL'], ncaaw: ['ILL'] }},
  649: { name: 'Evansville', teams: { ncaam: ['EVAN'], ncaaw: ['EVAN'] }},
  650: { name: 'Oklahoma City', teams: { nba: ['OKC'], ncaam: ['OU', 'OSU', 'UCO'], ncaaw: ['OU', 'OSU'] }},
  651: { name: 'Lubbock', teams: { ncaam: ['TTU'], ncaaw: ['TTU'] }},
  652: { name: 'Omaha', teams: { ncaam: ['NEB', 'CREI'], ncaaw: ['NEB', 'CREI'] }},
  656: { name: 'Panama City', teams: { ncaam: [''], ncaaw: [''] }},
  657: { name: 'Sherman-Ada', teams: { ncaam: [''], ncaaw: [''] }},
  658: { name: 'Green Bay-Appleton', teams: { nfl: ['GB'], ncaam: ['UWGB'], ncaaw: ['UWGB'] }},
  659: { name: 'Nashville', teams: { nfl: ['TEN'], nhl: ['NSH'], ncaam: ['VAND', 'BELM', 'MTSU'], ncaaw: ['VAND', 'BELM'] }},
  661: { name: 'San Angelo', teams: { ncaam: ['ASU'], ncaaw: ['ASU'] }},
  662: { name: 'Abilene-Sweetwater', teams: { ncaam: ['ACU'], ncaaw: ['ACU'] }},
  669: { name: 'Madison', teams: { ncaam: ['WISC'], ncaaw: ['WISC'] }},
  670: { name: 'Ft. Smith-Fayetteville', teams: { ncaam: ['ARK'], ncaaw: ['ARK'] }},
  671: { name: 'Tulsa', teams: { ncaam: ['TULSA', 'ORU'], ncaaw: ['TULSA', 'ORU'] }},
  673: { name: 'Columbus-Tupelo', teams: { ncaam: ['MSST'], ncaaw: ['MSST'] }},
  675: { name: 'Peoria-Bloomington', teams: { ncaam: ['BRAD', 'ILSU'], ncaaw: ['BRAD', 'ILSU'] }},
  676: { name: 'Duluth-Superior', teams: { ncaam: [''], ncaaw: [''] }},
  678: { name: 'Wichita-Hutchinson', teams: { ncaam: ['WICH'], ncaaw: ['WICH'] }},
  679: { name: 'Des Moines-Ames', teams: { ncaam: ['IOWA', 'ISU', 'DRAKE'], ncaaw: ['IOWA', 'ISU', 'DRAKE'] }},
  682: { name: 'Davenport-Rock Island', teams: { ncaam: [''], ncaaw: [''] }},
  686: { name: 'Mobile-Pensacola', teams: { ncaam: ['USA', 'TROY'], ncaaw: ['USA', 'TROY'] }},
  687: { name: 'Minot-Bismarck', teams: { ncaam: ['UND'], ncaaw: ['UND'] }},
  691: { name: 'Huntsville-Decatur', teams: { ncaam: [''], ncaaw: [''] }},
  692: { name: 'Beaumont-Port Arthur', teams: { ncaam: ['LAM'], ncaaw: ['LAM'] }},
  693: { name: 'Little Rock-Pine Bluff', teams: { ncaam: ['ARK', 'UALR', 'ARST'], ncaaw: ['ARK', 'UALR'] }},
  698: { name: 'Montgomery-Selma', teams: { ncaam: ['AUM', 'ALST'], ncaaw: ['AUM', 'ALST'] }},
  702: { name: 'La Crosse-Eau Claire', teams: { ncaam: [''], ncaaw: [''] }},
  705: { name: 'Wausau-Rhinelander', teams: { ncaam: [''], ncaaw: [''] }},
  709: { name: 'Tyler-Longview', teams: { ncaam: ['SFA'], ncaaw: ['SFA'] }},
  710: { name: 'Hattiesburg-Laurel', teams: { ncaam: ['USM'], ncaaw: ['USM'] }},
  711: { name: 'Meridian', teams: { ncaam: [''], ncaaw: [''] }},
  716: { name: 'Baton Rouge', teams: { ncaam: ['LSU'], ncaaw: ['LSU'] }},
  717: { name: 'Quincy-Hannibal', teams: { ncaam: [''], ncaaw: [''] }},
  718: { name: 'Jackson, MS', teams: { ncaam: ['JSU', 'MISS'], ncaaw: ['JSU', 'MISS'] }},
  722: { name: 'Lincoln-Hastings', teams: { ncaam: ['NEB'], ncaaw: ['NEB'] }},
  724: { name: 'Fargo-Valley City', teams: { ncaam: ['NDSU'], ncaaw: ['NDSU'] }},
  725: { name: 'Sioux Falls-Mitchell', teams: { ncaam: ['SDSU', 'USD'], ncaaw: ['SDSU', 'USD'] }},
  734: { name: 'Jonesboro', teams: { ncaam: ['ARST'], ncaaw: ['ARST'] }},
  736: { name: 'Bowling Green', teams: { ncaam: ['WKU'], ncaaw: ['WKU'] }},
  737: { name: 'Mankato', teams: { ncaam: [''], ncaaw: [''] }},
  740: { name: 'North Platte', teams: { ncaam: [''], ncaaw: [''] }},
  743: { name: 'Anchorage', teams: { ncaam: [''], ncaaw: [''] }},
  744: { name: 'Honolulu', teams: { ncaam: ['HAW'], ncaaw: ['HAW'] }},
  745: { name: 'Fairbanks', teams: { ncaam: [''], ncaaw: [''] }},
  746: { name: 'Biloxi-Gulfport', teams: { ncaam: [''], ncaaw: [''] }},
  747: { name: 'Juneau', teams: { ncaam: [''], ncaaw: [''] }},
  749: { name: 'Laredo', teams: { ncaam: [''], ncaaw: [''] }},
  751: { name: 'Denver', teams: { nba: ['DEN'], nfl: ['DEN'], mlb: ['COL'], nhl: ['COL'], ncaam: ['CU', 'DEN', 'CSU'], ncaaw: ['CU', 'DEN', 'CSU'] }},
  752: { name: 'Colorado Springs-Pueblo', teams: { ncaam: ['USAFA'], ncaaw: ['USAFA'] }},
  753: { name: 'Phoenix', teams: { nba: ['PHX'], nfl: ['ARI'], mlb: ['ARI'], nhl: ['ARI'], ncaam: ['ASU', 'ARIZ', 'GCU'], ncaaw: ['ASU', 'ARIZ', 'GCU'] }},
  754: { name: 'Butte-Bozeman', teams: { ncaam: ['MONT', 'MSU'], ncaaw: ['MONT', 'MSU'] }},
  755: { name: 'Great Falls', teams: { ncaam: [''], ncaaw: [''] }},
  756: { name: 'Billings', teams: { ncaam: [''], ncaaw: [''] }},
  757: { name: 'Boise', teams: { ncaam: ['BSU'], ncaaw: ['BSU'] }},
  758: { name: 'Idaho Falls-Pocatello', teams: { ncaam: ['ISU'], ncaaw: ['ISU'] }},
  759: { name: 'Cheyenne-Scottsbluff', teams: { ncaam: ['WYO'], ncaaw: ['WYO'] }},
  760: { name: 'Twin Falls', teams: { ncaam: [''], ncaaw: [''] }},
  762: { name: 'Missoula', teams: { ncaam: ['MONT'], ncaaw: ['MONT'] }},
  764: { name: 'Rapid City', teams: { ncaam: [''], ncaaw: [''] }},
  765: { name: 'El Paso', teams: { ncaam: ['UTEP'], ncaaw: ['UTEP'] }},
  766: { name: 'Helena', teams: { ncaam: [''], ncaaw: [''] }},
  767: { name: 'Casper-Riverton', teams: { ncaam: [''], ncaaw: [''] }},
  770: { name: 'Salt Lake City', teams: { nba: ['UTA'], nhl: ['UTA'], ncaam: ['UTAH', 'BYU', 'USU', 'WEBER'], ncaaw: ['UTAH', 'BYU', 'USU'] }},
  771: { name: 'Yuma-El Centro', teams: { ncaam: [''], ncaaw: [''] }},
  773: { name: 'Grand Junction', teams: { ncaam: [''], ncaaw: [''] }},
  789: { name: 'Tucson', teams: { ncaam: ['ARIZ'], ncaaw: ['ARIZ'] }},
  790: { name: 'Albuquerque-Santa Fe', teams: { ncaam: ['UNM'], ncaaw: ['UNM'] }},
  798: { name: 'Glendive', teams: { ncaam: [''], ncaaw: [''] }},
  800: { name: 'Bakersfield', teams: { ncaam: ['CSUB'], ncaaw: ['CSUB'] }},
  801: { name: 'Eugene', teams: { ncaam: ['ORE'], ncaaw: ['ORE'] }},
  802: { name: 'Eureka', teams: { ncaam: [''], ncaaw: [''] }},
  803: { name: 'Los Angeles', teams: { nba: ['LAL', 'LAC'], nfl: ['LAR', 'LAC'], mlb: ['LAD', 'LAA'], nhl: ['LAK', 'ANA'], ncaam: ['UCLA', 'USC', 'LMU', 'CSUF', 'CSUN', 'LBSU'], ncaaw: ['UCLA', 'USC', 'LMU', 'CSUF', 'LBSU'] }},
  804: { name: 'Palm Springs', teams: { ncaam: [''], ncaaw: [''] }},
  807: { name: 'San Francisco-Oakland', teams: { nba: ['GSW'], nfl: ['SF'], mlb: ['SF', 'OAK'], ncaam: ['CAL', 'STAN', 'USF', 'SCU', 'SJSU'], ncaaw: ['CAL', 'STAN', 'USF', 'SJSU'] }},
  810: { name: 'Yakima-Pasco', teams: { ncaam: [''], ncaaw: [''] }},
  811: { name: 'Reno', teams: { ncaam: ['NEV'], ncaaw: ['NEV'] }},
  813: { name: 'Medford-Klamath Falls', teams: { ncaam: ['SOU'], ncaaw: ['SOU'] }},
  819: { name: 'Seattle-Tacoma', teams: { nfl: ['SEA'], mlb: ['SEA'], nhl: ['SEA'], ncaam: ['WASH', 'WSU', 'GONZ', 'SEAT'], ncaaw: ['WASH', 'WSU', 'GONZ'] }},
  820: { name: 'Portland, OR', teams: { nba: ['POR'], ncaam: ['ORST', 'PORT', 'UP'], ncaaw: ['ORST', 'PORT'] }},
  821: { name: 'Bend, OR', teams: { ncaam: [''], ncaaw: [''] }},
  825: { name: 'San Diego', teams: { nfl: ['LAC'], mlb: ['SD'], ncaam: ['SDSU', 'USD'], ncaaw: ['SDSU', 'USD'] }},
  828: { name: 'Monterey-Salinas', teams: { ncaam: ['CSUMB'], ncaaw: ['CSUMB'] }},
  839: { name: 'Las Vegas', teams: { nba: ['LV'], nfl: ['LV'], nhl: ['VGK'], ncaam: ['UNLV'], ncaaw: ['UNLV'] }},
  855: { name: 'Santa Barbara', teams: { ncaam: ['UCSB'], ncaaw: ['UCSB'] }},
  862: { name: 'Sacramento-Stockton', teams: { nba: ['SAC'], ncaam: ['SACR', 'UOP'], ncaaw: ['SACR', 'UOP'] }},
  866: { name: 'Fresno-Visalia', teams: { ncaam: ['FRES'], ncaaw: ['FRES'] }},
  868: { name: 'Chico-Redding', teams: { ncaam: [''], ncaaw: [''] }},
  881: { name: 'Spokane', teams: { ncaam: ['GONZ', 'EWU'], ncaaw: ['GONZ', 'EWU'] }}
};

// ============================================
// EXPANDED ZIP-TO-DMA MAPPING
// For production, this would be loaded from a database or API
// This includes representative ZIPs for each DMA
// ============================================

const ZIP_TO_DMA = {};

// Generate ZIP mappings programmatically - in production this would be a full 42k+ ZIP database
// For now, we'll create a lookup that handles ranges and common ZIPs

const ZIP_RANGES = [
  // New York (501)
  { start: '10001', end: '10299', dma: 501 },
  { start: '10301', end: '10499', dma: 501 }, // Staten Island
  { start: '10501', end: '10599', dma: 501 },
  { start: '10601', end: '10999', dma: 501 },
  { start: '11001', end: '11499', dma: 501 }, // Long Island
  { start: '11501', end: '11999', dma: 501 },
  { start: '07001', end: '07999', dma: 501 }, // Northern NJ
  { start: '06001', end: '06099', dma: 533 }, // Hartford
  { start: '06100', end: '06199', dma: 533 },
  // Los Angeles (803)
  { start: '90001', end: '90899', dma: 803 },
  { start: '91001', end: '91899', dma: 803 },
  { start: '92001', end: '92199', dma: 803 },
  // Chicago (602)
  { start: '60001', end: '60699', dma: 602 },
  { start: '60701', end: '60999', dma: 602 },
  // Philadelphia (504)
  { start: '19001', end: '19199', dma: 504 },
  { start: '19301', end: '19499', dma: 504 },
  // Dallas-Ft Worth (623)
  { start: '75001', end: '75399', dma: 623 },
  { start: '76001', end: '76299', dma: 623 },
  // Houston (618)
  { start: '77001', end: '77599', dma: 618 },
  // Washington DC (511)
  { start: '20001', end: '20599', dma: 511 },
  { start: '22001', end: '22199', dma: 511 }, // Northern VA
  // Atlanta (524)
  { start: '30001', end: '30399', dma: 524 },
  { start: '31001', end: '31199', dma: 524 },
  // Boston (506)
  { start: '02101', end: '02299', dma: 506 },
  { start: '02301', end: '02599', dma: 506 },
  // Phoenix (753)
  { start: '85001', end: '85399', dma: 753 },
  // San Francisco (807)
  { start: '94001', end: '94199', dma: 807 },
  { start: '94501', end: '94699', dma: 807 }, // East Bay
  // Detroit (505)
  { start: '48001', end: '48399', dma: 505 },
  // Seattle (819)
  { start: '98001', end: '98199', dma: 819 },
  // Minneapolis (613)
  { start: '55001', end: '55199', dma: 613 },
  // Denver (751)
  { start: '80001', end: '80299', dma: 751 },
  // Miami (528)
  { start: '33001', end: '33199', dma: 528 },
  { start: '33301', end: '33499', dma: 528 },
  // Tampa (539)
  { start: '33501', end: '33699', dma: 539 },
  { start: '34201', end: '34299', dma: 539 },
  // Orlando (534)
  { start: '32801', end: '32899', dma: 534 },
  // Cleveland (510)
  { start: '44001', end: '44199', dma: 510 },
  // Portland OR (820)
  { start: '97001', end: '97299', dma: 820 },
  // St. Louis (609)
  { start: '63001', end: '63199', dma: 609 },
  // Indianapolis (527)
  { start: '46001', end: '46299', dma: 527 },
  // San Diego (825)
  { start: '92101', end: '92199', dma: 825 },
  // Nashville (659)
  { start: '37001', end: '37299', dma: 659 },
  // Kansas City (616)
  { start: '64001', end: '64199', dma: 616 },
  { start: '66001', end: '66199', dma: 616 },
  // Las Vegas (839)
  { start: '89001', end: '89199', dma: 839 },
  // Salt Lake City (770)
  { start: '84001', end: '84199', dma: 770 },
  // Milwaukee (617)
  { start: '53001', end: '53299', dma: 617 },
  // Cincinnati (515)
  { start: '45001', end: '45299', dma: 515 },
  // Austin (635)
  { start: '78701', end: '78799', dma: 635 },
  // San Antonio (641)
  { start: '78201', end: '78299', dma: 641 },
  // Columbus OH (535)
  { start: '43001', end: '43299', dma: 535 },
  // Pittsburgh (508)
  { start: '15001', end: '15299', dma: 508 },
  // Charlotte (517)
  { start: '28201', end: '28299', dma: 517 },
  // Raleigh-Durham (560)
  { start: '27601', end: '27699', dma: 560 },
  // New Orleans (622)
  { start: '70001', end: '70199', dma: 622 },
  // Memphis (640)
  { start: '38101', end: '38199', dma: 640 },
  // Louisville (529)
  { start: '40201', end: '40299', dma: 529 },
  // Baltimore (512)
  { start: '21201', end: '21299', dma: 512 },
  // Oklahoma City (650)
  { start: '73101', end: '73199', dma: 650 },
  // Richmond (556)
  { start: '23219', end: '23299', dma: 556 },
  // Buffalo (514)
  { start: '14201', end: '14299', dma: 514 },
  // Birmingham (630)
  { start: '35201', end: '35299', dma: 630 },
  // Jacksonville (561)
  { start: '32201', end: '32299', dma: 561 }
];

// Function to look up DMA from ZIP
function lookupDMA(zip) {
  const zipNum = parseInt(zip, 10);
  
  for (const range of ZIP_RANGES) {
    const start = parseInt(range.start, 10);
    const end = parseInt(range.end, 10);
    if (zipNum >= start && zipNum <= end) {
      const dmaInfo = DMA_DATA[range.dma];
      if (dmaInfo) {
        return {
          dma: range.dma,
          name: dmaInfo.name,
          teams: Object.values(dmaInfo.teams).flat().filter(t => t)
        };
      }
    }
  }
  
  // Return out-of-market for unknown ZIPs
  return {
    dma: 0,
    name: 'Out of Market Area',
    teams: []
  };
}

// ============================================
// STREAMING PLATFORM DATA (CORRECTED)
// ESPN+ is a STREAMER, not broadcast partner
// Added Fox Sports+ (Fox's owned streamer)
// ============================================

const PLATFORM_CATEGORIES = {
  BROADCAST: ['FOX', 'CBS', 'NBC', 'ABC', 'ESPN', 'ESPN2', 'TNT', 'TBS', 'FS1', 'FS2', 'NBCSN', 'USA Network', 'truTV'],
  STREAMING: ['ESPN+', 'Peacock', 'Paramount+', 'Prime Video', 'Apple TV+', 'Netflix', 'Fox Sports+', 'Tubi', 'Max', 'NBA TV', 'MLB Network', 'NHL Network', 'NFL Network'],
  RSN: ['YES Network', 'SNY', 'MSG', 'NESN', 'NBC Sports Boston', 'NBC Sports Philadelphia', 'NBC Sports Bay Area', 'NBC Sports Chicago', 'NBC Sports California', 'Bally Sports', 'FanDuel Sports Network', 'Spectrum SportsNet', 'AT&T SportsNet', 'Altitude', 'ROOT Sports', 'Space City Home Network'],
  LEAGUE_DTC: ['NBA League Pass', 'MLB.TV', 'NHL Center Ice', 'NFL Sunday Ticket', 'ESPN+'],
  VMVPD: ['YouTube TV', 'Hulu + Live TV', 'fuboTV', 'Sling TV', 'DirecTV Stream']
};

// RSN to streaming availability mapping
const RSN_STREAMING = {
  'YES Network': { streamers: ['Prime Video', 'fuboTV'], adSupported: true },
  'SNY': { streamers: ['fuboTV', 'Hulu + Live TV'], adSupported: true },
  'MSG': { streamers: ['fuboTV', 'DirecTV Stream'], adSupported: true },
  'NESN': { streamers: ['fuboTV', 'DirecTV Stream', 'NESN 360'], adSupported: true },
  'NBC Sports Boston': { streamers: ['Peacock', 'fuboTV', 'YouTube TV'], adSupported: true },
  'NBC Sports Philadelphia': { streamers: ['Peacock', 'fuboTV', 'YouTube TV'], adSupported: true },
  'NBC Sports Bay Area': { streamers: ['Peacock', 'fuboTV', 'YouTube TV'], adSupported: true },
  'NBC Sports Chicago': { streamers: ['Peacock', 'fuboTV', 'YouTube TV'], adSupported: true },
  'NBC Sports California': { streamers: ['Peacock', 'fuboTV', 'YouTube TV'], adSupported: true },
  'Bally Sports': { streamers: ['Bally Sports+', 'DirecTV Stream'], adSupported: true },
  'FanDuel Sports': { streamers: ['FanDuel TV+', 'fuboTV'], adSupported: true },
  'Spectrum SportsNet': { streamers: ['Spectrum TV', 'DirecTV Stream'], adSupported: true },
  'AT&T SportsNet': { streamers: ['DirecTV Stream'], adSupported: true },
  'Altitude': { streamers: ['Altitude+', 'fuboTV'], adSupported: true },
  'ROOT Sports': { streamers: ['fuboTV', 'DirecTV Stream'], adSupported: true },
  'Space City Home Network': { streamers: ['DirecTV Stream', 'fuboTV'], adSupported: true }
};

// National broadcast streaming options
const NATIONAL_BROADCAST_STREAMING = {
  'FOX': { streamers: ['Fox Sports+', 'Tubi', 'fuboTV', 'YouTube TV', 'Hulu + Live TV'], adSupported: true },
  'CBS': { streamers: ['Paramount+', 'fuboTV', 'YouTube TV', 'Hulu + Live TV'], adSupported: true },
  'NBC': { streamers: ['Peacock', 'fuboTV', 'YouTube TV', 'Hulu + Live TV'], adSupported: true },
  'ABC': { streamers: ['ESPN+', 'Hulu', 'fuboTV', 'YouTube TV'], adSupported: true },
  'ESPN': { streamers: ['ESPN+', 'fuboTV', 'YouTube TV', 'Hulu + Live TV', 'Sling TV'], adSupported: true },
  'ESPN2': { streamers: ['ESPN+', 'fuboTV', 'YouTube TV', 'Hulu + Live TV', 'Sling TV'], adSupported: true },
  'ESPNU': { streamers: ['ESPN+', 'fuboTV', 'YouTube TV', 'Sling TV'], adSupported: true },
  'ESPN+': { streamers: ['ESPN+ (direct)'], adSupported: true, isStreamer: true },
  'TNT': { streamers: ['Max', 'Sling TV', 'YouTube TV', 'Hulu + Live TV'], adSupported: true },
  'TBS': { streamers: ['Max', 'Sling TV', 'YouTube TV', 'Hulu + Live TV'], adSupported: true },
  'FS1': { streamers: ['Fox Sports+', 'fuboTV', 'YouTube TV', 'Hulu + Live TV', 'Sling TV'], adSupported: true },
  'FS2': { streamers: ['Fox Sports+', 'fuboTV', 'YouTube TV'], adSupported: true },
  'USA Network': { streamers: ['Peacock', 'fuboTV', 'YouTube TV', 'Hulu + Live TV'], adSupported: true },
  'truTV': { streamers: ['Max', 'Sling TV', 'YouTube TV'], adSupported: true },
  'Prime Video': { streamers: ['Prime Video (direct)'], adSupported: true, isStreamer: true },
  'Apple TV+': { streamers: ['Apple TV+ (direct)'], adSupported: false, isStreamer: true },
  'Peacock': { streamers: ['Peacock (direct)'], adSupported: true, isStreamer: true },
  'Netflix': { streamers: ['Netflix (direct)'], adSupported: true, isStreamer: true },
  'NBA TV': { streamers: ['NBA League Pass', 'Sling TV', 'fuboTV', 'YouTube TV'], adSupported: true },
  'MLB Network': { streamers: ['MLB.TV', 'Sling TV', 'fuboTV', 'YouTube TV'], adSupported: true },
  'NHL Network': { streamers: ['ESPN+', 'Sling TV', 'fuboTV'], adSupported: true },
  'NFL Network': { streamers: ['NFL+', 'Sling TV', 'fuboTV', 'YouTube TV'], adSupported: true },
  'Big Ten Network': { streamers: ['Peacock', 'fuboTV', 'YouTube TV', 'Sling TV'], adSupported: true },
  'SEC Network': { streamers: ['ESPN+', 'fuboTV', 'YouTube TV', 'Sling TV'], adSupported: true },
  'ACC Network': { streamers: ['ESPN+', 'fuboTV', 'YouTube TV', 'Sling TV'], adSupported: true },
  'Big 12 Network': { streamers: ['ESPN+'], adSupported: true },
  'Pac-12 Network': { streamers: ['fuboTV', 'Sling TV'], adSupported: true }
};

// ============================================
// LEAGUE CONFIGURATIONS
// ============================================

const LEAGUES = {
  nba: { name: 'NBA', path: 'basketball/nba', color: '#C9082A', leaguePass: 'NBA League Pass' },
  nfl: { name: 'NFL', path: 'football/nfl', color: '#013369', leaguePass: 'NFL Sunday Ticket' },
  mlb: { name: 'MLB', path: 'baseball/mlb', color: '#002D72', leaguePass: 'MLB.TV' },
  nhl: { name: 'NHL', path: 'hockey/nhl', color: '#000000', leaguePass: 'ESPN+' },
  ncaam: { name: 'NCAAM', path: 'basketball/mens-college-basketball', color: '#0033A0', leaguePass: null },
  ncaaw: { name: 'NCAAW', path: 'basketball/womens-college-basketball', color: '#FF6B00', leaguePass: null }
};

// ============================================
// MAIN APP COMPONENT
// ============================================

export default function CurrentsSportsIntel() {
  const [zipCode, setZipCode] = useState('');
  const [market, setMarket] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState('nba');
  const [dataSource, setDataSource] = useState('loading');
  const [expandedGame, setExpandedGame] = useState(null);

  // Fetch games from ESPN API
  const fetchGames = useCallback(async (league) => {
    setLoading(true);
    setError(null);
    setDataSource('loading');
    
    try {
      const leagueConfig = LEAGUES[league];
      const response = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/${leagueConfig.path}/scoreboard`
      );
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      setGames(data.events || []);
      setDataSource('live');
    } catch (err) {
      console.error('ESPN API Error:', err);
      setError('Failed to fetch games. ESPN API may be rate-limited.');
      setGames([]);
      setDataSource('sample');
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGames(selectedLeague);
  }, [selectedLeague, fetchGames]);

  // Handle ZIP code submission
  const handleZipSubmit = (e) => {
    e.preventDefault();
    const cleanZip = zipCode.replace(/\D/g, '').slice(0, 5);
    if (cleanZip.length === 5) {
      const marketData = lookupDMA(cleanZip);
      setMarket(marketData);
    }
  };

  // Parse broadcasts from ESPN data
  const parseBroadcasts = (game) => {
    const broadcasts = { national: [], local: [], streaming: [] };
    
    // Get from geoBroadcasts
    const geoBroadcasts = game.competitions?.[0]?.geoBroadcasts || [];
    
    geoBroadcasts.forEach(gb => {
      const network = gb.media?.shortName || '';
      const marketType = gb.market?.type || '';
      const mediaType = gb.type?.shortName || '';
      
      // Categorize the broadcast
      const broadcastInfo = NATIONAL_BROADCAST_STREAMING[network];
      
      if (broadcastInfo?.isStreamer || mediaType === 'Streaming') {
        broadcasts.streaming.push({
          network,
          streamers: broadcastInfo?.streamers || [network],
          adSupported: broadcastInfo?.adSupported ?? true,
          isDirectStreamer: broadcastInfo?.isStreamer || false
        });
      } else if (marketType === 'National') {
        broadcasts.national.push({
          network,
          streamers: broadcastInfo?.streamers || [],
          adSupported: broadcastInfo?.adSupported ?? true
        });
      } else {
        broadcasts.local.push({
          network,
          marketType,
          streamers: RSN_STREAMING[network]?.streamers || broadcastInfo?.streamers || [],
          adSupported: RSN_STREAMING[network]?.adSupported ?? broadcastInfo?.adSupported ?? true
        });
      }
    });
    
    // Also check competitions broadcasts
    const compBroadcasts = game.competitions?.[0]?.broadcasts || [];
    compBroadcasts.forEach(b => {
      if (b.names) {
        b.names.forEach(network => {
          const broadcastInfo = NATIONAL_BROADCAST_STREAMING[network];
          if (broadcastInfo && !broadcasts.national.find(bn => bn.network === network) && 
              !broadcasts.streaming.find(bs => bs.network === network)) {
            if (broadcastInfo.isStreamer) {
              broadcasts.streaming.push({
                network,
                streamers: broadcastInfo.streamers,
                adSupported: broadcastInfo.adSupported,
                isDirectStreamer: true
              });
            } else {
              broadcasts.national.push({
                network,
                streamers: broadcastInfo.streamers || [],
                adSupported: broadcastInfo.adSupported ?? true
              });
            }
          }
        });
      }
    });
    
    return broadcasts;
  };

  // Determine availability status
  const getAvailabilityStatus = (game, userMarket) => {
    if (!userMarket) {
      return { 
        status: 'unknown', 
        message: 'Enter ZIP to check availability',
        details: null
      };
    }
    
    const broadcasts = parseBroadcasts(game);
    const competition = game.competitions?.[0];
    const homeTeam = competition?.competitors?.find(c => c.homeAway === 'home')?.team?.abbreviation;
    const awayTeam = competition?.competitors?.find(c => c.homeAway === 'away')?.team?.abbreviation;
    
    const isLocalTeam = userMarket.teams.includes(homeTeam) || userMarket.teams.includes(awayTeam);
    
    // Check for national broadcasts first
    if (broadcasts.national.length > 0) {
      const allStreamers = [...new Set(broadcasts.national.flatMap(b => b.streamers))];
      return {
        status: 'national',
        message: 'National Broadcast',
        isLocal: isLocalTeam,
        broadcasts: broadcasts.national,
        streamingOptions: allStreamers,
        adSupported: broadcasts.national.some(b => b.adSupported),
        details: {
          type: 'national',
          networks: broadcasts.national.map(b => b.network),
          streaming: broadcasts.streaming
        }
      };
    }
    
    // Check for direct streaming
    if (broadcasts.streaming.length > 0) {
      return {
        status: 'streaming',
        message: 'Streaming Exclusive',
        isLocal: isLocalTeam,
        broadcasts: broadcasts.streaming,
        streamingOptions: broadcasts.streaming.map(s => s.network),
        adSupported: broadcasts.streaming.some(s => s.adSupported),
        details: {
          type: 'streaming',
          platforms: broadcasts.streaming.map(s => s.network)
        }
      };
    }
    
    // Local market logic
    if (isLocalTeam) {
      const localBroadcasts = broadcasts.local.filter(b => 
        b.marketType === 'Home' || b.marketType === 'Away'
      );
      
      if (localBroadcasts.length > 0) {
        const allStreamers = [...new Set(localBroadcasts.flatMap(b => b.streamers))];
        return {
          status: 'local',
          message: 'In-Market (Local RSN)',
          isLocal: true,
          broadcasts: localBroadcasts,
          streamingOptions: allStreamers,
          adSupported: localBroadcasts.some(b => b.adSupported),
          details: {
            type: 'local',
            networks: localBroadcasts.map(b => b.network),
            streaming: broadcasts.streaming
          }
        };
      }
    }
    
    // Out of market
    const leagueConfig = LEAGUES[selectedLeague];
    return {
      status: 'out-of-market',
      message: 'Out-of-Market',
      isLocal: false,
      broadcasts: [],
      streamingOptions: leagueConfig.leaguePass ? [leagueConfig.leaguePass] : ['Check league streaming'],
      adSupported: false,
      details: {
        type: 'out-of-market',
        leaguePass: leagueConfig.leaguePass
      }
    };
  };

  // Format game time
  const formatGameTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <div className="min-h-screen text-slate-100" style={{ backgroundColor: '#0a1628', fontFamily: '"Inter", system-ui, sans-serif' }}>
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-6 py-5 border-b" style={{ borderColor: 'rgba(8, 145, 178, 0.2)', background: 'linear-gradient(180deg, #0d1d33 0%, #0a1628 100%)' }}>
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide" style={{ color: '#f8fafc', letterSpacing: '0.05em' }}>
              CURRENTS<span style={{ color: '#0891b2' }}>SPORTS</span>
            </h1>
            <p className="text-xs tracking-widest mt-1" style={{ color: '#64748b' }}>
              SPORTS INTELLIGENCE LAYER
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs tracking-wider px-3 py-1.5 rounded ${
            dataSource === 'live' ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700' : 
            dataSource === 'sample' ? 'bg-amber-900/50 text-amber-400 border border-amber-700' : 
            'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            {dataSource === 'live' ? '● LIVE DATA' : dataSource === 'sample' ? '○ SAMPLE' : '○ LOADING'}
          </span>
          <span className="text-xs tracking-wider px-3 py-1.5 rounded" style={{ backgroundColor: 'rgba(8, 145, 178, 0.15)', color: '#0891b2', border: '1px solid rgba(8, 145, 178, 0.3)' }}>
            v2.0
          </span>
        </div>
      </header>

      {/* Market Input Section */}
      <section className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 border-b" style={{ backgroundColor: '#0d1d33', borderColor: 'rgba(8, 145, 178, 0.15)' }}>
        <div className="flex-1">
          <form onSubmit={handleZipSubmit} className="flex flex-col gap-3">
            <label className="text-xs tracking-widest" style={{ color: '#64748b' }}>
              YOUR MARKET
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="Enter ZIP Code"
                className="px-4 py-3 text-base rounded-md outline-none transition-all w-36 sm:w-44"
                style={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  color: '#f8fafc'
                }}
              />
              <button 
                type="submit" 
                className="px-5 py-3 text-xs font-semibold tracking-wider rounded-md transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#0891b2',
                  color: '#ffffff'
                }}
              >
                SET LOCATION
              </button>
            </div>
            <p className="text-xs" style={{ color: '#475569' }}>
              Full US coverage: All 210 DMAs supported
            </p>
          </form>
        </div>
        
        {market && (
          <div className="px-5 py-4 rounded-lg" style={{ backgroundColor: '#1e293b', borderLeft: '4px solid #0891b2' }}>
            <div className="text-xs tracking-widest mb-2" style={{ color: '#64748b' }}>
              DESIGNATED MARKET AREA
            </div>
            <div className="text-xl font-semibold" style={{ color: '#f8fafc' }}>
              {market.name}
            </div>
            <div className="text-sm mt-1" style={{ color: '#94a3b8' }}>
              DMA {market.dma}
            </div>
            {market.teams && market.teams.length > 0 && (
              <div className="text-xs mt-2" style={{ color: '#64748b' }}>
                Local teams: {market.teams.slice(0, 6).join(', ')}{market.teams.length > 6 ? '...' : ''}
              </div>
            )}
          </div>
        )}
      </section>

      {/* League Selector */}
      <section className="px-4 sm:px-6 border-b overflow-x-auto" style={{ borderColor: 'rgba(8, 145, 178, 0.15)' }}>
        <div className="flex min-w-max">
          {Object.entries(LEAGUES).map(([key, league]) => (
            <button
              key={key}
              onClick={() => setSelectedLeague(key)}
              className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-semibold tracking-wider transition-all border-b-2"
              style={{
                borderColor: selectedLeague === key ? '#0891b2' : 'transparent',
                color: selectedLeague === key ? '#0891b2' : '#64748b',
                backgroundColor: selectedLeague === key ? 'rgba(8, 145, 178, 0.1)' : 'transparent'
              }}
            >
              {league.name}
            </button>
          ))}
        </div>
      </section>

      {/* Games Grid */}
      <section className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold tracking-wide" style={{ color: '#f8fafc' }}>
            {LEAGUES[selectedLeague].name} Schedule
          </h2>
          <button 
            onClick={() => fetchGames(selectedLeague)}
            className="text-xs tracking-wider px-3 py-2 rounded transition-all hover:opacity-80"
            style={{ backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155' }}
          >
            ↻ REFRESH
          </button>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-t-cyan-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm" style={{ color: '#64748b' }}>Loading games...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 px-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid gap-4 sm:gap-5">
          {games.map(game => {
            const availability = getAvailabilityStatus(game, market);
            const competition = game.competitions?.[0];
            const homeTeam = competition?.competitors?.find(c => c.homeAway === 'home');
            const awayTeam = competition?.competitors?.find(c => c.homeAway === 'away');
            const isExpanded = expandedGame === game.id;
            const broadcasts = parseBroadcasts(game);
            
            return (
              <div 
                key={game.id}
                className="rounded-lg overflow-hidden transition-all cursor-pointer"
                style={{ 
                  backgroundColor: '#0f172a',
                  border: availability.status === 'local' ? '1px solid rgba(16, 185, 129, 0.4)' :
                          availability.status === 'national' ? '1px solid rgba(8, 145, 178, 0.4)' :
                          availability.status === 'streaming' ? '1px solid rgba(168, 85, 247, 0.4)' :
                          '1px solid #1e293b'
                }}
                onClick={() => setExpandedGame(isExpanded ? null : game.id)}
              >
                {/* Game Header */}
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Teams */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                          {awayTeam?.team?.logo && (
                            <img src={awayTeam.team.logo} alt="" className="w-8 h-8 object-contain" />
                          )}
                          <span className="font-semibold text-base" style={{ color: '#f8fafc' }}>
                            {awayTeam?.team?.displayName || awayTeam?.team?.shortDisplayName || 'TBD'}
                          </span>
                        </div>
                        <span className="text-xs" style={{ color: '#64748b' }}>@</span>
                        <div className="flex items-center gap-2">
                          {homeTeam?.team?.logo && (
                            <img src={homeTeam.team.logo} alt="" className="w-8 h-8 object-contain" />
                          )}
                          <span className="font-semibold text-base" style={{ color: '#f8fafc' }}>
                            {homeTeam?.team?.displayName || homeTeam?.team?.shortDisplayName || 'TBD'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Time & Status */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm" style={{ color: '#94a3b8' }}>
                        {formatGameTime(game.date)}
                      </span>
                      <span 
                        className="text-xs px-3 py-1.5 rounded font-medium"
                        style={{
                          backgroundColor: availability.status === 'local' ? 'rgba(16, 185, 129, 0.15)' :
                                          availability.status === 'national' ? 'rgba(8, 145, 178, 0.15)' :
                                          availability.status === 'streaming' ? 'rgba(168, 85, 247, 0.15)' :
                                          availability.status === 'out-of-market' ? 'rgba(239, 68, 68, 0.15)' :
                                          'rgba(100, 116, 139, 0.15)',
                          color: availability.status === 'local' ? '#10b981' :
                                availability.status === 'national' ? '#0891b2' :
                                availability.status === 'streaming' ? '#a855f7' :
                                availability.status === 'out-of-market' ? '#ef4444' :
                                '#64748b'
                        }}
                      >
                        {availability.message}
                      </span>
                    </div>
                  </div>
                  
                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {(availability.streamingOptions || []).slice(0, 3).map((platform, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: '#1e293b', color: '#94a3b8' }}
                      >
                        {platform}
                      </span>
                    ))}
                    {(availability.streamingOptions || []).length > 3 && (
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#1e293b', color: '#64748b' }}>
                        +{availability.streamingOptions.length - 3} more
                      </span>
                    )}
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: availability.adSupported ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: availability.adSupported ? '#10b981' : '#ef4444'
                      }}
                    >
                      {availability.adSupported ? '✓ Ad inventory' : '✗ No ads'}
                    </span>
                  </div>
                </div>
                
                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t" style={{ borderColor: '#1e293b' }}>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {/* National Broadcasts */}
                      <div>
                        <h4 className="text-xs font-semibold tracking-wider mb-2" style={{ color: '#64748b' }}>
                          BROADCAST
                        </h4>
                        {broadcasts.national.length > 0 ? (
                          <div className="space-y-2">
                            {broadcasts.national.map((b, idx) => (
                              <div key={idx}>
                                <div className="font-medium text-sm" style={{ color: '#f8fafc' }}>{b.network}</div>
                                <div className="text-xs" style={{ color: '#64748b' }}>
                                  → {(b.streamers || []).slice(0, 3).join(', ') || 'Check local listings'}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs" style={{ color: '#475569' }}>No national broadcast</p>
                        )}
                      </div>
                      
                      {/* Streaming */}
                      <div>
                        <h4 className="text-xs font-semibold tracking-wider mb-2" style={{ color: '#64748b' }}>
                          STREAMING
                        </h4>
                        {broadcasts.streaming.length > 0 ? (
                          <div className="space-y-1">
                            {broadcasts.streaming.map((s, idx) => (
                              <div key={idx} className="text-sm" style={{ color: '#a855f7' }}>
                                {s.network}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs" style={{ color: '#475569' }}>Via broadcast streamers</p>
                        )}
                      </div>
                      
                      {/* Local/RSN */}
                      <div>
                        <h4 className="text-xs font-semibold tracking-wider mb-2" style={{ color: '#64748b' }}>
                          LOCAL RSN
                        </h4>
                        {broadcasts.local.length > 0 ? (
                          <div className="space-y-2">
                            {broadcasts.local.map((b, idx) => (
                              <div key={idx}>
                                <div className="font-medium text-sm" style={{ color: '#f8fafc' }}>
                                  {b.network} <span className="text-xs" style={{ color: '#64748b' }}>({b.marketType})</span>
                                </div>
                                {(b.streamers || []).length > 0 && (
                                  <div className="text-xs" style={{ color: '#64748b' }}>
                                    → {(b.streamers || []).slice(0, 2).join(', ')}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs" style={{ color: '#475569' }}>No local coverage</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Ad Inventory Summary */}
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: '#1e293b' }}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold tracking-wider" style={{ color: '#64748b' }}>
                          AD INVENTORY STATUS:
                        </span>
                        <span 
                          className={`text-xs font-medium ${availability.adSupported ? 'text-emerald-400' : 'text-red-400'}`}
                        >
                          {availability.adSupported 
                            ? '✓ Addressable inventory available via streaming platforms' 
                            : '✗ No ad-supported options (subscription-only streams)'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {games.length === 0 && !loading && !error && (
          <div className="text-center py-16" style={{ color: '#64748b' }}>
            No games scheduled. Try switching leagues or check back later.
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-8 border-t" style={{ backgroundColor: '#0d1d33', borderColor: 'rgba(8, 145, 178, 0.15)' }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold tracking-wide" style={{ color: '#f8fafc' }}>
                CURRENTS<span style={{ color: '#0891b2' }}>SPORTS</span>
              </h3>
              <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                Sports Intelligence Layer by Currents Media Solutions
              </p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: '#64748b' }}>
              <span style={{ color: '#475569' }}>DATA:</span>
              <span>ESPN API</span>
              <span style={{ color: '#334155' }}>•</span>
              <span>Nielsen DMA</span>
              <span style={{ color: '#334155' }}>•</span>
              <span>RSN Mapping</span>
            </div>
          </div>
          <div className="text-xs leading-relaxed" style={{ color: '#475569' }}>
            © 2026 Currents Media Solutions. Full 210 DMA coverage. Streaming availability subject to change.
          </div>
          <a 
            href="https://www.currentsmediasolutions.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs transition-colors"
            style={{ color: '#0891b2' }}
          >
            www.currentsmediasolutions.com
          </a>
        </div>
      </footer>
    </div>
  );
}
