import { Box, Skeleton } from "@mui/material"
import DeathCard from "./DeathCard"
import { useCardsGet } from "../queries/cards"
import KillerCard from "../pages/KillerPage/killerCard"



export default function CardList({isKiller}) {
  
  const { isLoading, data: cards } = useCardsGet()

  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns:{lg:'1fr 1fr 1fr', md:'1fr 1fr', xs:'1fr' }, p: 2, mt: 10, alignItems: "start", justifyItems: "center" }}>
      {isLoading &&
        [...Array(6)].map((_, i) => (
          <Skeleton  key={i} height="320px" width="85%" variant="rect" />
        ))}
      {cards?.map(card => (
        isKiller ? <KillerCard key={card.id} data={card}/> : <DeathCard key={card.id} data={card}/>
      ))}
    </Box>
  )
}