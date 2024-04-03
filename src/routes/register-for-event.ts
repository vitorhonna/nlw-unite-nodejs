import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function registerForEvent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events/:eventId/attendees', {
      schema: {
        body: z.object({
          name: z.string().min(4).max(100),
          email: z.string().email().max(100)
        }),
        params: z.object({
          eventId: z.string().uuid()
        }),
        response: {
          201: z.object({
            attendeeId: z.number()
          }),
          400: z.object({
            error: z.string()
          })
        }
      }
    }, async (request, reply) => {
      const { eventId } = request.params
      const { name, email } = request.body

      const attendeeFromEmail =  await prisma.attendee.findUnique({
        where: {
          eventId_email: {
            email,
            eventId
          }
        }
      })

      if (attendeeFromEmail !== null) {
        return reply.status(400).send({
          error: 'This email is already registered for this event'
        })
      }

      const [event, amountOfAttendeesForEvent] = await Promise.all([
        prisma.event.findUnique({
          where: {
            id: eventId
          }
        }),

        prisma.attendee.count({
          where: {
            eventId
          }
        })
      ])

      if (event === null) {
        return reply.status(400).send({
          error: 'Event not found'
        })
      }

      if (event?.maximumAttendees && amountOfAttendeesForEvent >= event?.maximumAttendees) {
        return reply.status(400).send({
          error: 'This event is already full'
        })
      }

      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId
        }
      })

      return reply.status(201).send({ attendeeId: attendee.id })
    })
}