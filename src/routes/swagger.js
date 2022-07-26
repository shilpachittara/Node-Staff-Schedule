/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: The user's name.
 *           example: test
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: test@test.com
 *         role:
 *           type: string
 *           description: The user's role as 'staff' and 'admin'.
 *           example: staff
 *         password:
 *           type: string
 *           description: Currently it is string. storing as bcrypt.hashSync(req.body.password, 8).
 *           example: test
 *     
 *      
 *     UpdateUser:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: The user's name.
 *           example: test
 *         role:
 *           type: string
 *           description: The user's role as 'staff' and 'admin'.
 *           example: staff
 * 
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/NewUser'
 *     NewSchedule:
 *       type: object
 *       properties:
 *         date_start:
 *           type: string
 *           description: Starting date for staff.
 *           example: "21-10-2022"
 *         date_end:
 *           type: string
 *           description: ending date for staff.
 *           example: "21-10-2022"
 *         user_id:
 *           type: integer
 *           description: User Id of the staff.
 *           example: 1
 *         shift_length:
 *           type: string
 *           description: Total shift time.
 *           example: "8"
 *         shift_start:
 *           type: string
 *           description: shift start time.
 *           example: "10:00"
 *         shift_end:
 *           type: string
 *           description: Shift End time.
 *           example: "18:00"
 *     
 *     ScheduleObject:
 *       type: object
 *       properties:
 *         date_start:
 *           type: string
 *           description: Starting date for staff.
 *           example: "21-10-2022"
 *         date_end:
 *           type: string
 *           description: ending date for staff.
 *           example: "21-10-2022"
 *         user_id:
 *           type: integer
 *           description: User Id of the staff.
 *           example: 1
 *         shift_length:
 *           type: string
 *           description: Total shift time.
 *           example: "8"
 *         shift_start:
 *           type: string
 *           description: shift start time.
 *           example: "10:00"
 *         shift_end:
 *           type: string
 *           description: Shift End time.
 *           example: "18:00"
*         user:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *  
 *     Schedule:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/ScheduleObject'
 * 
 *     TotalSchedule:
 *       type: object
 *       properties:
 *         total_shift_length:
 *           type: string
 *           description: Total work.
 *           example: "24"
 *         user:
 *           type: object
 *           $ref: '#/components/schemas/User'
 * 
 *
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register new user
 *     tags:
 *         - auth
 *     description:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *
 * /api/auth/signin:
 *   post:
 *     summary: User Login
 *     tags:
 *         - auth
 *     description:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      type: object
 *                      $ref: '#/components/schemas/UserLoginResponse'
 * 
 * 
 */

/**
 * @swagger
 * /api/staff/schedule/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get User Schedule by userid
 *     tags:
 *         - staff
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Schedule'
 *
 *
 */

/**
 * @swagger
 * /api/staff/all/schedule/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all staff Schedule
 *     tags:
 *         - staff
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Schedule'
 *
 *
 */

/**
 * @swagger
 * /api/admin/all/user/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all user for admin
 *     tags:
 *         - Admin
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/User'
 *
 *
 */

/**
 * @swagger
 * /api/admin/user/{id}/{user_id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: update user for admin
 *     tags:
 *         - Admin
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/User'
 *
 *
 */

/**
 * @swagger
 * /api/admin/user/{id}/{user_id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: update user for admin
 *     tags:
 *         - Admin
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   data:
 *                      type: string
 *
 *
 */

/**
 * @swagger
 * /api/admin/all/schedule/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all user schedule for admin
 *     tags:
 *         - Admin
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Schedule'
 *
 *
 */

/**
 * @swagger
 * /api/admin/schedule/{id}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: update user for admin
 *     tags:
 *         - Admin
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/NewSchedule'
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Schedule'
 *
 *
 */

/**
 * @swagger
 * /api/admin/schedule/{id}/{schedule_id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: update user for admin
 *     tags:
 *         - Admin
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/NewSchedule'
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Schedule'
 *
 *
 */

/**
 * @swagger
 * /api/admin/schedule/{id}/{schedule_id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: update user for admin
 *     tags:
 *         - Admin
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   data:
 *                      type: string
 *
 *
 */

/**
 * @swagger
 * /api/admin/all/user/schedule/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all user total schedule
 *     tags:
 *         - Admin
 *     description:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: user detail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/TotalSchedule'
 *
 *
 */




