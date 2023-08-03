import axios from 'axios';
import cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = await req.json();
  if (res.url) {
    try {
      const response = await axios.get(res.url);
      if (!response) return NextResponse.json({ isError: true });
      const html = response.data;
      const $ = cheerio.load(html);

      const title = $('title').text();
      const description =
        $('p').text() ||
        $('h1').text() ||
        $('h2').text() ||
        $('h3').text() ||
        $('h4').text() ||
        $('h5').text() ||
        $('h6').text();
      const image = $('img').attr('src');

      return NextResponse.json({
        isError: false,
        data: { title, description, image },
      });
    } catch (error) {
      return NextResponse.json({ isError: true });
    }
  }
}
