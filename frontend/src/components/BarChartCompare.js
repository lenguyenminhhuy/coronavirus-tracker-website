// ----------------------------------
// |                                |
// |   LEFT OVER CHART. DO NOT USE  |
// |                                |
// ----------------------------------

// import React, {useEffect, useState} from 'react';
// import {
//     CartesianGrid,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Legend,
//     Bar,
//     ComposedChart,
//     ResponsiveContainer,
//     Brush,
//     Line,
//     Scatter
//   } from "recharts";
// import { Box, Select, RadioGroup, Stack, Radio, Flex } from '@chakra-ui/react'
// import CustomAxisX from "./shared/CustomAxisX";
// import CustomTooltip from "./shared/CustomTooltip";
// import normalizeCamelCase from "../utils/normalizeCamelCase";
// import colors from '../constants/colors';
// function BarChartCompare() {

//     const data0 = [
//         {
//             date: '2021-08-20',
//             newCases: 100,
//             country: "Vietnam",

//             averageNewCases: 102
//         },
//         {
//             date: '2021-08-21',
//             newCases: 120,
//             country: "Vietnam",
//             averageNewCases: 106
//         },
//         {
//             date: '2021-08-22',
//             newCases: 130,
//             country: "Vietnam",
//             averageNewCases: 112
//         },
//         {
//             date: '2021-08-23',
//             newCases: 110,
//             country: "Vietnam",
//             averageNewCases: 104
//         },
//         {
//             date: '2021-08-24',
//             newCases: 150,
//             country: "Vietnam",
//             averageNewCases: 122
//         },
//     ]

//     const data1 = [
//         {
//             date: '2021-08-20',
//             newCases: 120,
//             country: "Thailand",
//             averageNewCases: 102
//         },
//         {
//             date: '2021-08-21',
//             newCases: 160,
//             country: "Thailand",
//             averageNewCases: 126
//         },
//         {
//             date: '2021-08-22',
//             newCases: 10,
//             country: "Thailand",
//             averageNewCases: 52
//         },
//         {
//             date: '2021-08-23',
//             newCases: 130,
//             country: "Thailand",
//             averageNewCases: 201
//         },
//         {
//             date: '2021-08-24',
//             newCases: 440,
//             country: "Thailand",
//             averageNewCases: 322
//         }
//     ]

//     return (
//         <Box w="100%" h="100%">
//             <ResponsiveContainer width="100%" height="90%" aspect={1}>
//                 <ComposedChart
//                     width="100%"
//                     height="100%"
//                     margin={{ top: 20, right: 30, left: 30, bottom: 30 }}   
//                 >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis
//                         minTickGap={20}
//                         dataKey="date"
//                         tick={<CustomAxisX mode="date" />}
//                     />
//                     <Tooltip content={<CustomTooltip mode="date" />} />
//                     <Legend verticalAlign="top" />   
//                     <YAxis dataKey="averageNewCases" tickFormatter={(value) => value.toLocaleString()} />
//                     {/* <Scat type="monotone" dataKey={"newCases"} data={data0} name={normalizeCamelCase("newCases")} fill={colors.oceanBlueDarker} /> */}
//                     <Line dataKey="averageNewCases" data={data0} name={normalizeCamelCase("averageNewCases")} stroke={colors.oceanBlueDefault} />
//                     {/* <Bar type="monotone" dataKey={"newCases"} data={data1} name={normalizeCamelCase("newCases")} fill={colors.oceanBlueDarker} /> */}
//                     <Line data={data1} name={normalizeCamelCase("averageNewCases")} stroke={colors.oceanBlueDefault} /> 
//                 </ComposedChart>
//             </ResponsiveContainer>
//           </Box>
//     )
// }

// export default BarChartCompare;