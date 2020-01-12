const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = {top: 50, right: 60, bottom: 60, left: 140};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top -margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0,d3.max(data, xValue)])
        .range([0, innerWidth]);

    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0,innerHeight])
        .padding(0.1);

    const xAxisTickFormat = number => 
        d3.format('.3s')(number)
        .replace('G','B');

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-(innerHeight));

    const yAxis = d3.axisLeft(yScale);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    g.append('g')
        .call(yAxis)
        .selectAll('.domain, .tick line')
            .remove();

    xAxisG =   g.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`)      

    
    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 50)
        .attr('x',innerWidth/2)
        .attr('fill', 'black')
        .text('Population')

    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth())
            .attr('transform', `translate(2,0)`);
    
    g.append('text')
        .attr('class', 'title')
        .attr('y',-10)
        .text('Top 10 most populated countries');
};

d3.csv('countrydata.csv').then(data => {
    data.forEach(d=> {
        d.population = +d.population*1000;
    });

    console.log(data);
    render(data);
});
console.log("js run here.....");

