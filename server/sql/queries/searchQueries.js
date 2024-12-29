module.exports = {
    advancedSearch: `
      SELECT
        c.plate_id,
        c.model AS car_model,
        c.year AS car_year,
        c.colour AS car_colour,
        c.price_per_hour,
        c.num_seats,
        c.speed,
        c.fuel_cons,
        c.image_url,
        cs.status_name AS car_status,
        o.office_name,
        o.location AS office_location,
        r.order_no,
        r.start_date,
        r.end_date,
        cu.id AS customer_id,
        cu.name AS customer_name,
        cu.email AS customer_email,
        cu.created_at AS customer_since
      FROM
        Car c
      LEFT JOIN
        CarStatus cs ON c.status_id = cs.status_id
      LEFT JOIN
        Office o ON c.office_id = o.office_id
      LEFT JOIN
        Reserve r ON c.plate_id = r.plate_id
      LEFT JOIN
        Customer cu ON r.cust_id = cu.id
      WHERE
        c.plate_id LIKE ?
        OR c.model LIKE ?
        OR CAST(c.year AS CHAR) LIKE ?
        OR c.colour LIKE ?
        OR o.location LIKE ?
        OR cs.status_name LIKE ?
        OR cu.email LIKE ?
        OR CAST(cu.id AS CHAR) LIKE ?
        OR DATE_FORMAT(r.start_date, '%Y-%m-%d') LIKE ?
        OR DATE_FORMAT(r.end_date, '%Y-%m-%d') LIKE ?
    `,
  };