'use client'
import { useQuery } from '@apollo/client'
import { GET_FONTS } from '@/graphql/queries'
import { GetFontsQuery, GetFontsQueryVariables } from '@/src/__generated__/graphql'

export default function Home() {

  const { data, loading } = useQuery<GetFontsQuery, GetFontsQueryVariables>(GET_FONTS)

  if (loading || !data) return <div>Loading</div>

  const fonts = data.fonts?.data

  return (
    <>
      <div>
        <h2 className="fontName">Fonts</h2>
        <ul>
          {fonts?.map((font) => {
            const familyName = font.attributes?.query_name;
            return (
              <li key={font.attributes?.family_name}>
                <a href={`/font/${familyName}`}>{font.attributes?.family_name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
